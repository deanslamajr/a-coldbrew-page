import { Sequelize } from 'sequelize-typescript';

import { Accounts } from './models/Accounts';
import { NewAccountTokens } from './models/NewAccountTokens';
import { Chores } from './models/Chores';

import { serverSecrets } from '../../../../../env-config';

export const sequelize = new Sequelize(
  serverSecrets.DB_DBNAME,
  serverSecrets.DB_USERNAME,
  serverSecrets.DB_PASSWORD,
  {
    host: serverSecrets.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
    // logging: (query) => {
    //   console.log(query);
    // }
  }
);

sequelize.addModels([Accounts, NewAccountTokens, Chores]);

export { Accounts, NewAccountTokens, Chores };
