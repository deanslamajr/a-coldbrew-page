export interface ChoreInterface {
  id: string;
  name: string;
  description: string;
  due: Date;
}

export interface ClientCacheInterface {
  chores: ChoreInterface[];
}
