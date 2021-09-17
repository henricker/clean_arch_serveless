import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IRoleEntity } from '@domain/entities/roleEntity'

export const IRoleRepositoryToken = Symbol.for('IRoleRepositoryToken')

export interface IRoleRepository {
	findBy(
		key: RoleEntityKeys,
		value: IRoleEntity[RoleEntityKeys]
	): Promise<void | IRoleEntity>
}
