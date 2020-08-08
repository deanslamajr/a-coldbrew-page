export interface DueDateInterface {
  year: number;
  month: number;
  day: number;
}

export interface ChoreInterface {
  id: string;
  summary: string;
  description: string;
  dueDate: DueDateInterface;
  version: number;
}

export interface ClientCacheInterface {
  chores: ChoreInterface[];
}
