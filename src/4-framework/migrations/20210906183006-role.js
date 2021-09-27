'use strict'

// eslint-disable-next-line
const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
  up: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      profile: {
        type: DataTypes.STRING(30),
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
  },

  down: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('role');
     */
    await queryInterface.dropTable('roles')
  },
}
