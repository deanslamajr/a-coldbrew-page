/* eslint-disable @typescript-eslint/camelcase */
import { QueryInterface } from 'sequelize';
const tableName = 'new-account-tokens';

const migration = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    return queryInterface.createTable(tableName, {
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
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable(tableName);
  },
};

export default migration;
