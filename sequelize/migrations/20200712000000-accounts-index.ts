import { QueryInterface } from 'sequelize';

const accountsTable = 'accounts';
const uniqueIndex = 'accounts_email_unique';

const migration = {
  up: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.addConstraint(accountsTable, ['email'], {
      type: 'unique',
      name: uniqueIndex,
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeConstraint(accountsTable, uniqueIndex);
  },
};

export default migration;
