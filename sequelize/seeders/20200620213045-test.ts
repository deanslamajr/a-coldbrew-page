/* eslint-disable @typescript-eslint/camelcase */
import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { NewAccountTokens } from '../../src/graphql/resolvers/services/db';

const code = 'test-code';

const migration = {
  up: async (): Promise<NewAccountTokens> => {
    return NewAccountTokens.create({
      id: uuidv4(),
      code,
      email: 'email@email.com',
      has_been_used: false,
    });
  },

  down: (queryInterface: QueryInterface): Promise<object> => {
    return queryInterface.bulkDelete('new-account-tokens', { code });
  },
};

export default migration;
