'use strict'

const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const password = await bcrypt.hash('admin_password', 6)

    await queryInterface.bulkInsert('users', [
      {
        full_name: 'AdminUser',
        uuid: v4(),
        email: 'admin@admin.com',
        role_id: 1,
        password,
      },
      {
        full_name: 'InternUser',
        uuid: v4(),
        email: 'intern@intern.com',
        role_id: 2,
        password,
      },
    ])
  },

  down: async (queryInterface, _Sequelize) => {
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
