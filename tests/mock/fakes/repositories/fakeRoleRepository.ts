import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/roleEntity'
import { injectable } from 'inversify'

@injectable()
export class FakeRoleRepository implements IRoleRepository {
  async findBy(
    _key: RoleEntityKeys,
    _value: IRoleEntity[RoleEntityKeys]
  ): Promise<void | IRoleEntity> {
    return void 0
  }
}
