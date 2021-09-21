import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/roleEntity'
import { RoleModel } from '@framework/models/roles/roleModel'
import { inject, injectable } from 'inversify'

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor(@inject(RoleModel) private roleModel: typeof RoleModel) {}

  async findBy(
    key: RoleEntityKeys,
    value: IRoleEntity[RoleEntityKeys]
  ): Promise<void | IRoleEntity> {
    const role = await this.roleModel.findOne({ where: { [key]: value } })

    return role
  }
}
