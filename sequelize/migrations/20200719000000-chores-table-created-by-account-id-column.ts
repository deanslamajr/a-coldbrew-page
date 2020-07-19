/* eslint-disable @typescript-eslint/camelcase */
import { QueryInterface } from 'sequelize';

const accountsTable = 'accounts';
const choresTable = 'chores';

const migration = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    return queryInterface.createTable(choresTable, {
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.TEXT,
      due_date: Sequelize.DATE,
      completed_at: Sequelize.DATE,
      version: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      created_by_account_id: {
        type: Sequelize.UUID,
        references: {
          model: accountsTable,
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable(choresTable);
  },
};

export default migration;
