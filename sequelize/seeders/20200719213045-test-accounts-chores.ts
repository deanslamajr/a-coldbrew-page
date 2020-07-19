import { QueryInterface } from 'sequelize';

import { Accounts } from '../../src/graphql-server/resolvers/services/db';

const email = 'testtest@test.test';
const summary = 'some summmmmmmmary';

const migration = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.sequelize.transaction(async transaction => {
      const account = await Accounts.create(
        {
          email,
          password: 'hashedPassword',
          lastLoginAt: new Date(),
        },
        { transaction }
      );
      await account.$create(
        'choresCreated',
        {
          summary,
          description: 'some description',
          dueDate: new Date(),
        },
        { transaction }
      );
    });
  },

  down: (queryInterface: QueryInterface): Promise<object> => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.bulkDelete('chores', { summary }, { transaction });
      return queryInterface.bulkDelete('accounts', { email }, { transaction });
    });
  },
};

export default migration;
