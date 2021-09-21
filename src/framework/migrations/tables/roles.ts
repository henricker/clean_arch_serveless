import { Knex } from 'knex'

export const rolesTable = (
	table: Knex.TableBuilder,
	aditionalConfigs?: (table: Knex.TableBuilder) => void
) => {
	table.increments('id').primary().unsigned()
	table.string('profile').notNullable().unique()
	table.timestamp('created_at').notNullable()
	table.timestamp('updated_at').notNullable()

	aditionalConfigs && aditionalConfigs(table)
}
