import { RoleEntityKeys } from '@business/dto/role/findBy'
import {
  IInputDeleteRole,
  IInputUpdateRole,
  IRoleRepository,
} from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/roleEntity'
import { injectable } from 'inversify'
import { fakeRoleEntity } from '../entities/fakeRoleEntity'

@injectable()
export class FakeRoleRepository implements IRoleRepository {
  async create(_input: IRoleEntity): Promise<IRoleEntity> {
    return fakeRoleEntity
  }

  async findBy(
    _key: RoleEntityKeys,
    _value: IRoleEntity[RoleEntityKeys]
  ): Promise<void | IRoleEntity> {
    return void 0
  }

  async update(_input: IInputUpdateRole): Promise<IRoleEntity | void> {
    return void 0
  }

  async delete(_input: IInputDeleteRole): Promise<IRoleEntity | void> {
    return void 0
  }
}

export const fakeRoleRepositoryFindBy = jest.spyOn(
  FakeRoleRepository.prototype,
  'findBy'
)

export const fakeRoleRepositoryDelete = jest.spyOn(
  FakeRoleRepository.prototype,
  'delete'
)
