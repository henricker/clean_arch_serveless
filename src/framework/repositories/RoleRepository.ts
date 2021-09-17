import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/roleEntity'
import { RoleModel } from '@framework/models/Role'
import { injectable } from 'inversify'
import { getRepository } from 'typeorm'

@injectable()
export class RoleRepository implements IRoleRepository {
	async findBy(
		key: RoleEntityKeys,
		value: IRoleEntity[RoleEntityKeys]
	): Promise<void | IRoleEntity> {
		const roleRepository = getRepository(RoleModel)

		const role = await roleRepository.findOne({ where: { [key]: value } })

		if (!role) {
			return void 0
		}

		return role
	}
}
