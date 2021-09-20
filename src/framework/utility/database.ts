import { Connection, createConnection } from 'typeorm'
import typeormConfig from '@root/ormconfig'
import { UserModel } from '@framework/models/User'
import { RoleModel } from '@framework/models/Role'

/**
 * This assumes that the tyeormConfig[0] is the default configuration
 * All the entities must be registered in the connection, this is a
 * workaround for blob patterns that dont work well with webpack
 */
export const connectTypeorm = async (): Promise<Connection> => {
	const defaultCon = await createConnection({
		...typeormConfig[0],
		entities: [UserModel, RoleModel],
		name: `default_${new Date().getTime()}_${Math.random()}`,
	})

	return defaultCon
}
