import { QueryInterface } from 'sequelize';

import { NewAccountTokens } from '../../src/graphql-server/resolvers/services/db';

import { newAccountTokensTable, testEmail } from '../constants';

const migration = {
  up: async (): Promise<NewAccountTokens> => {
    return NewAccountTokens.create({ email: testEmail });
  },

  down: (queryInterface: QueryInterface): Promise<object> => {
    return queryInterface.bulkDelete(newAccountTokensTable, {
      email: testEmail,
    });
  },
};

export default migration;
