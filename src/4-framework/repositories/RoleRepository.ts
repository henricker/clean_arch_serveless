import { IFindAllPaginated } from '@root/src/2-business/dto/role/findAll'
import { RoleEntityKeys } from '@root/src/2-business/dto/role/findBy'
import {
  IInputDeleteRole,
  IInputFindAllRole,
  IInputUpdateRole,
  IRoleRepository,
} from '@root/src/2-business/repositories/role/iRoleRepository'
import {
  InputCreateRoleEntity,
  IRoleEntity,
} from '@root/src/1-domain/entities/roleEntity'
import { RoleModel } from '@root/src/4-framework/models/roles/roleModel'
import { inject, injectable } from 'inversify'

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor(@inject(RoleModel) private roleModel: typeof RoleModel) {}
  async create(input: InputCreateRoleEntity): Promise<IRoleEntity> {
    try {
      const role = await this.roleModel.create(input)

      return role.get({ plain: true })
    } catch (error) {
      console.error(error)
      return void 0
    }
  }

  async findBy(
    key: RoleEntityKeys,
    value: IRoleEntity[RoleEntityKeys]
  ): Promise<void | IRoleEntity> {
    try {
      const role = await this.roleModel.findOne({ where: { [key]: value } })

      return role.get({ plain: true })
    } catch (error) {
      return void 0
    }
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

  async delete(input: IInputDeleteRole): Promise<IRoleEntity | void> {
    try {
      const role = await this.roleModel.findOne({
        where: { [input.key]: input.value },
      })

      await role.destroy()

      return role
    } catch (error) {
      console.error(error)
      return void 0
    }
  }

  async findAll(input: IInputFindAllRole): Promise<IFindAllPaginated | void> {
    try {
      const rolesResult = await this.roleModel.findAndCountAll({
        limit: input.limit,
        offset: (input.page - 1) * input.limit,
      })
      return {
        count: rolesResult.count,
        page: input.page,
        roles: rolesResult.rows,
      }
    } catch (error) {
      console.error(error)
      return void 0
    }
  }
}
