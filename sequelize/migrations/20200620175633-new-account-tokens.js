/* eslint-disable @typescript-eslint/camelcase */

const tableName = 'new-account-tokens';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
      hasBeenUsed: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(tableName);
  },
};
