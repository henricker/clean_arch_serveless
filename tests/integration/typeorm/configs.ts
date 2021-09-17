import { createConnection, getConnectionManager } from 'typeorm'
import typeormConfig from '@root/ormconfig'
import { RoleModel } from '@framework/models/Role'

export const typeormBeforeAllConfig = async () => {
	const testConnectionOptions = typeormConfig.find(
		({ name }) => name === 'tests'
	)

	const testsConnection = await createConnection({
		...testConnectionOptions,
		name: 'default',
	})

	await testsConnection.dropDatabase()
}

export const typeormBeforeEachConfig = async () => {
	const testsConnection = getConnectionManager().get()

	await testsConnection.dropDatabase()
	await testsConnection.runMigrations()

	const currentDate = new Date()

	await testsConnection.getRepository(RoleModel).save([
		{ profile: 'admin', created_at: currentDate, updated_at: currentDate },
		{ profile: 'manager', created_at: currentDate, updated_at: currentDate },
	])
}

export const typeormAfterAllConfig = async () => {
	const testsConnection = getConnectionManager().get()

	await testsConnection.close()
}
