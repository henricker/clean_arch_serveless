'use strict'

module.exports = {
  up: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        profile: 'admin',
      },
      {
        id: 2,
        profile: 'manager',
      },
    ])
  },

  down: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', { profile: 'admin' })
    await queryInterface.bulkDelete('roles', { profile: 'manager' })
  },
}
