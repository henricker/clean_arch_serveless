import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	// await knex("table_name").del();

	// Inserts seed entries
	await knex('roles').insert([
		{ profile: 'admin', created_at: new Date(), updated_at: new Date() },
		{ profile: 'manager', created_at: new Date(), updated_at: new Date() },
	])
}
