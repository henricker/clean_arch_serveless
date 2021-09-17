import { config } from 'dotenv'
import path from 'path'
config()

import { ConnectionOptions } from 'typeorm'

const {
	MYSQL_HOST: host,
	MYSQL_USERNAME: username,
	MYSQL_PASSWORD: password,
	MYSQL_DB: database,
} = process.env

const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306

/**
 * MYSQL Version must be 8.0, all the tests and migrations where created using this
 * version, if it does not work in other versions you maybe will need to tweak some parts
 */

const typeormDefaultConfig: ConnectionOptions = {
	type: 'mysql',
	host,
	port,
	username,
	password,
	database,
	entities: [path.join(__dirname, 'src/framework/models/*.ts')],
	migrations: [path.join(__dirname, 'src/framework/migrations/*.ts')],
	cli: {
		migrationsDir: 'src/framework/migrations',
	},
}

const typeormConfig: ConnectionOptions[] = [
	{
		...typeormDefaultConfig,
	},
	{
		...typeormDefaultConfig,
		name: 'seeds',
		migrations: [path.join(__dirname, 'src/framework/seeds/*.ts')],
		cli: {
			migrationsDir: 'src/framework/seeds/',
		},
	},
	{
		...typeormDefaultConfig,
		name: 'tests',
		database: 'serverless_tests',
		migrations: [
			path.join(__dirname, 'tests/integration/tests_migrations/*.ts'),
		],
		cli: {
			migrationsDir: 'tests/integration/tests_migrations/',
		},
	},
]

export default typeormConfig
