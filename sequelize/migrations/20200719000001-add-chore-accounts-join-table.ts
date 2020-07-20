/* eslint-disable @typescript-eslint/camelcase */
import { QueryInterface } from 'sequelize';

import { accountsTable, choreAccountsTable, choresTable } from '../constants';

const migration = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    return queryInterface.createTable(choreAccountsTable, {
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      chore_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: choresTable,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      account_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: accountsTable,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable(choreAccountsTable);
  },
};

export default migration;
