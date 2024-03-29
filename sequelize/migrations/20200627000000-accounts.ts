/* eslint-disable @typescript-eslint/camelcase */
import { QueryInterface } from 'sequelize';

import { accountsTable } from '../constants';

const migration = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    return queryInterface.createTable(accountsTable, {
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      last_login_at: Sequelize.DATE,
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable(accountsTable);
  },
};

export default migration;
