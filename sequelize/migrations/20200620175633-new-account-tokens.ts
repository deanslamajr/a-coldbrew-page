/* eslint-disable @typescript-eslint/camelcase */
import { QueryInterface } from 'sequelize';

import { newAccountTokensTable } from '../constants';

const migration = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    return queryInterface.createTable(newAccountTokensTable, {
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      has_been_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable(newAccountTokensTable);
  },
};

export default migration;
