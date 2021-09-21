import { Knex } from 'knex'

export const usersTable = (
  table: Knex.TableBuilder,
  aditionalConfigs?: (table: Knex.TableBuilder) => void
) => {
  table.increments('id').primary().unsigned()
  table.string('uuid', 72).unique()
  table
    .integer('role_id')
    .unsigned()
    .references('id')
    .inTable('roles')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  table.string('full_name').notNullable()
  table.string('email').notNullable()
  table.string('password').notNullable()
  table.timestamp('created_at').notNullable()
  table.timestamp('updated_at').notNullable()

  aditionalConfigs && aditionalConfigs(table)
}
