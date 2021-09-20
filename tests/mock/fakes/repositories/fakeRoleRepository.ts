import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/roleEntity'
import { injectable } from 'inversify'
import { fakeCreatedRoleEntity } from '../entities/fakeRoleEntity'

@injectable()
export class FakeRoleRepository implements IRoleRepository {
	async findBy(
		key: RoleEntityKeys,
		value: IRoleEntity[RoleEntityKeys]
	): Promise<void | IRoleEntity> {
		const roles: IRoleEntity[] = [
			fakeCreatedRoleEntity,
			{ ...fakeCreatedRoleEntity, id: 2, profile: 'manager' },
		]
		return roles.find((role) => role[key] === value)
	}
}
