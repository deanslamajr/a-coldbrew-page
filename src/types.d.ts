export interface DueDateInterface {
  year: number;
  month: number;
  day: number;
}

export interface ChoreInterface {
  id: string;
  name: string;
  description: string;
  due: DueDateInterface;
  version: number;
}

export interface ClientCacheInterface {
  chores: ChoreInterface[];
}
