import { IUserEntity, IUserEntityRelations } from '@domain/entities/userEntity'

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken')

export type UserEntityKeys = keyof Omit<
	IUserEntity,
	'password' | 'created_at' | 'updated_at'
>

export interface IUserRepository {
	create(
		inputUserEntity: Omit<IUserEntity, 'id'>,
		role_id: number
	): Promise<IUserEntity>
	findBy(
		type: UserEntityKeys,
		key: IUserEntity[UserEntityKeys],
		relations?: (keyof IUserEntityRelations)[] | string[]
	): Promise<void | IUserEntity>
}
