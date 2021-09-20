import { Knex } from 'knex'
import { usersTable } from './tables/users'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', usersTable)
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users')
}
