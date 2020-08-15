import { sortDueDatesFn } from './dueDates';

import { ChoreInterface } from '../types';

export const sortChores = (chores: ChoreInterface[]): ChoreInterface[] => {
  return chores.slice().sort(({ dueDate: a }, { dueDate: b }) => {
    return sortDueDatesFn(a, b);
  });
};
