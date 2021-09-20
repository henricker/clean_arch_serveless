import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/roleEntity'
import { Database } from '@framework/utility/database'
import { injectable } from 'inversify'

@injectable()
export class RoleRepository implements IRoleRepository {
	async findBy(
		key: RoleEntityKeys,
		value: IRoleEntity[RoleEntityKeys]
	): Promise<void | IRoleEntity> {
		const role = await Database('roles').where(key, value).first()

		return role
	}
}
