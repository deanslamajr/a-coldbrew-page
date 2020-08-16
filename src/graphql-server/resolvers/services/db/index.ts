import { Sequelize } from 'sequelize-typescript';

import { Accounts } from './models/Accounts';
import { NewAccountTokens } from './models/NewAccountTokens';
import { Chores } from './models/Chores';
import { ChoreAccounts } from './models/ChoreAccounts';

import { serverSecrets } from '../../../../../env-config';

const logging =
  serverSecrets.NODE_ENV === 'production'
    ? false
    : (sql: string, timing: any) => {
        console.log({ sql });
      };

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
    logging,
  }
);

sequelize.addModels([Accounts, NewAccountTokens, Chores, ChoreAccounts]);

export { Accounts, NewAccountTokens, Chores, ChoreAccounts };
