import { ChoreInterface } from '../types';
import { getCache, setCache } from './localstorage';
import { transformDateToDueDate } from './dueDates';
import { choreVersion } from './constants';

const transformChores = (chores: any[]): ChoreInterface[] => {
  // transform original datastructure to v1
  if (chores.length && !chores[0].version) {
    return chores.map((chore: any) => {
      const dueDate = new Date(chore.due);
      return {
        ...chore,
        due: transformDateToDueDate(dueDate),
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
