import { Relation } from '@business/repositories/relation'
import {
	IUserRepository,
	UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/userEntity'
import { Database } from '@framework/utility/database'
import { injectable } from 'inversify'

@injectable()
export class UserRepository implements IUserRepository {
	async create(
		inputUserEntity: Omit<IUserEntity, 'id'>,
		role_id: number
	): Promise<IUserEntity> {
		const userId = (
			await Database('users').insert({ ...inputUserEntity, role_id })
		)[0] as unknown as number

		const user = { ...inputUserEntity, id: userId }

		return user
	}
	async findBy(
		type: UserEntityKeys,
		key: IUserEntity[UserEntityKeys],
		relations?: Relation<string, UserEntityKeys>[]
	): Promise<void | IUserEntity> {
		const query = Database('users').select('*').where(`users.${type}`, key)

		if (relations) {
			relations.forEach(
				({ tableName, currentTableColumn, foreignJoinColumn }) => {
					query.join(
						`${tableName} as ${tableName}_map`,
						`users.${currentTableColumn}`,
						foreignJoinColumn.replace(`${tableName}`, `${tableName}_map`)
					)
				}
			)
		}

		console.log(query.toSQL())

		const user = await query
		console.log(user)

		return void 0
	}
}
