'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert('roles', [
      {
        profile: 'admin',
      },
      {
        profile: 'manager',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'roles',
      [
        {
          profile: 'admin',
        },
        {
          profile: 'manager',
        },
      ],
      {}
    )
  },
}
