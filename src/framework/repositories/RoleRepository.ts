import { RoleEntityKeys } from '@business/dto/role/findBy'
import {
  IInputUpdateRole,
  IRoleRepository,
} from '@business/repositories/role/iRoleRepository'
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

    return role.get({ plain: true })
  }
  async update(input: IInputUpdateRole): Promise<IRoleEntity | void> {
    try {
      await this.roleModel.update(input.newData, {
        where: { [input.updateWhere.type]: input.updateWhere.key },
      })

      return input.newData
    } catch (error) {
      console.error(error)
      return void 0
    }
  }
}
