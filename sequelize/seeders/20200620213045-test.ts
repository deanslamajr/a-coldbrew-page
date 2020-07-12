import { QueryInterface } from 'sequelize';

import { NewAccountTokens } from '../../src/graphql-server/resolvers/services/db';

const email = 'testtest@test.test';

const migration = {
  up: async (): Promise<NewAccountTokens> => {
    return NewAccountTokens.create({ email });
  },

  down: (queryInterface: QueryInterface): Promise<object> => {
    return queryInterface.bulkDelete('new-account-tokens', { email });
  },
};

export default migration;
