import shortid from 'shortid';

import { ChoreInterface } from '../types';
import { getCache, setCache } from './localstorage';
import { isDueDateFormat, transformDateToDueDate } from './dueDates';
import { choreVersion } from './constants';

import { ChoreInput } from '../graphql-client/mutations/createChore.graphql';

const isVersion1OrEarlier = (version: number | undefined): boolean => {
  return !version || version <= 1;
};

const transformChores = (chores: any[]): ChoreInterface[] => {
  // transform original datastructure to v1
  if (chores.length && isVersion1OrEarlier(chores[0].version)) {
    return chores.map((chore: any) => {
      let dueDate;
      if (isDueDateFormat(chore.due)) {
        dueDate = chore.due;
      } else if (isDueDateFormat(chore.dueDate)) {
        dueDate = chore.dueDate;
      } else if (chore.due) {
        dueDate = transformDateToDueDate(new Date(chore.due));
      } else if (chore.dueDate) {
        dueDate = transformDateToDueDate(new Date(chore.dueDate));
      } else {
        console.error('chore with invalid date format:', chore);
        throw new Error(
          'A chore in localstorage has an invalid due date format'
        );
      }

      return {
        ...chore,
        dueDate,
        version: choreVersion,
      };
    });
  }
  return chores;
};

export const getChores = (): ChoreInterface[] => {
  const chores = getCache().chores;
  return transformChores(chores);
};

export const setChores = (chores: ChoreInterface[]): void => {
  const cache = getCache();
  cache.chores = chores;
  setCache(cache);
};

export const addChore = (chore: ChoreInput): ChoreInterface => {
  const newChore: ChoreInterface = {
    id: shortid.generate(),
    summary: chore.summary,
    description: chore.description,
    dueDate: transformDateToDueDate(chore.dueDate),
    version: choreVersion,
  };

  const chores = getChores();

  const newChoresPayload = [...chores, newChore];

  setChores(newChoresPayload);

  return newChore;
};
