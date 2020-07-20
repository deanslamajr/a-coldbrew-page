import { QueryInterface } from 'sequelize';

import { Accounts } from '../../src/graphql-server/resolvers/services/db';

import { testSummary, testEmail } from '../constants';

const migration = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.sequelize.transaction(async transaction => {
      const account = await Accounts.create(
        {
          email: testEmail,
          password: 'hashedPassword',
          lastLoginAt: new Date(),
        },
        { transaction }
      );
      const chore = await account.$create(
        'choresCreated',
        {
          summary: testSummary,
          description: 'some description',
          dueDate: new Date(),
        },
        { transaction }
      );
      // @see https://sequelize.org/master/manual/advanced-many-to-many.html
      await chore.$add('ownedByAccounts', [account], {
        //through: { chore_id: false },
        transaction,
      });
    });
  },

  down: (queryInterface: QueryInterface): Promise<object> => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.bulkDelete(
        'chores',
        { summary: testSummary },
        { transaction }
      );
      return queryInterface.bulkDelete(
        'accounts',
        { email: testEmail },
        { transaction }
      );
    });
  },
};

export default migration;
