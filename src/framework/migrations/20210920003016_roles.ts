import { Knex } from 'knex'
import { rolesTable } from './tables/roles'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('roles', rolesTable)
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('roles')
}
