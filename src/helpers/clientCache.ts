import shortid from 'shortid';

import { ChoreInterface } from '../types';
import { getCache, setCache } from './localstorage';
import { transformDateToDueDate } from './dueDates';
import { choreVersion } from './constants';

import { ChoreInput } from '../graphql-client/mutations/createChore.graphql';

const transformChores = (chores: any[]): ChoreInterface[] => {
  // transform original datastructure to v1
  if (chores.length && !chores[0].version) {
    return chores.map((chore: any) => {
      const dueDate = new Date(chore.due);
      return {
        ...chore,
        dueDate: transformDateToDueDate(dueDate),
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
