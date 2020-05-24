import shortid from 'shortid';

import {
  ClientCacheInterface,
  ChoreInterface,
  DueDateInterface,
} from '../types';
import { transformDateToDueDate } from './dueDates';
import { choreVersion } from './constants';

const getDateForDaysAgo = (daysOverDue: number): DueDateInterface => {
  const now = new Date(Date.now());
  now.setDate(now.getDate() - daysOverDue);
  return transformDateToDueDate(now);
};

const getDateForHoursAgo = (hoursOverDue: number): DueDateInterface => {
  const now = new Date(Date.now());
  now.setHours(now.getHours() - hoursOverDue);
  return transformDateToDueDate(now);
};

export const mockedChores: ChoreInterface[] = [
  // Over due
  {
    id: shortid.generate(),
    name: 'Sweep them floors',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForDaysAgo(1),
    version: choreVersion,
  },
  {
    id: shortid.generate(),
    name: 'Wash the doge',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForDaysAgo(7),
    version: choreVersion,
  },
  // Due today
  {
    id: shortid.generate(),
    name: 'Mop those flos',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForHoursAgo(1),
    version: choreVersion,
  },
  {
    id: shortid.generate(),
    name: 'Teach that pup "high 5" trick',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForHoursAgo(10),
    version: choreVersion,
  },
  // Not yet due
  {
    id: shortid.generate(),
    name: 'Listen to new NoDoubt record',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForDaysAgo(-5),
    version: choreVersion,
  },
  {
    id: shortid.generate(),
    name: 'Touch up the pots',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    due: getDateForHoursAgo(-10),
    version: choreVersion,
  },
];

export const mockClientCache: ClientCacheInterface = {
  chores: mockedChores,
};
