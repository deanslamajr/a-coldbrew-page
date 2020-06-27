import { Model } from 'sequelize-typescript';

export const getValuesFromInstance = <T extends Model<T>>(instance: T): T => {
  return instance.get() as T;
};
