import { Knex } from 'knex'
import { config } from 'dotenv'
import path from 'path'
config()

const knexConfig: Knex.Config = {
	client: 'mysql2',
	connection: {
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DB,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
	},
	migrations: {
		directory: path.resolve(__dirname, 'src', 'framework', 'migrations'),
	},
	seeds: {
		directory: path.resolve(__dirname, 'src', 'framework', 'seeds'),
	},
	useNullAsDefault: true,
}

export default knexConfig
