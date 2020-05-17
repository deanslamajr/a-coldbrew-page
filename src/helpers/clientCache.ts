import { ChoreInterface } from '../types';
import { getCache, setCache } from './localstorage';

export const getChores = (): ChoreInterface[] => {
  return getCache().chores;
};

export const setChores = (chores: ChoreInterface[]): void => {
  const cache = getCache();
  cache.chores = chores;
  setCache(cache);
};
