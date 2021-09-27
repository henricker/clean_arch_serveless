'use strict'

// eslint-disable-next-line
const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
  up: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'roles',
            key: 'id',
          },
          key: 'id',
        },
        allowNull: false,
      },
      uuid: {
        type: DataTypes.STRING(72),
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING(200),
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      forgot_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      forgot_password_token_expires_in: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
