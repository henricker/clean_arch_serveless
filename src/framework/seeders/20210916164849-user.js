'use strict'

const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const password = await bcrypt.hash('admin', 6)

    await queryInterface.bulkInsert('users', [
      {
        full_name: 'AdminUser',
        uuid: randomUUID(),
        email: 'admin@admin.com',
        role_id: 1,
        password,
      },
      {
        full_name: 'InternUser',
        uuid: randomUUID(),
        email: 'intern@intern.com',
        role_id: 2,
        password,
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
          email: 'admin@admin.com',
        },
        {
          email: 'intern@intern.com',
        },
      ],
      {}
    )
  },
}
