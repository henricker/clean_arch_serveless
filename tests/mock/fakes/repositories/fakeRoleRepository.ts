import { IFindAllPaginated } from '@root/src/2-business/dto/role/findAll'
import { RoleEntityKeys } from '@root/src/2-business/dto/role/findBy'
import {
  IInputDeleteRole,
  IInputFindAllRole,
  IInputUpdateRole,
  IRoleRepository,
} from '@root/src/2-business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { injectable } from 'inversify'
import { fakeCreatedRoleEntity } from '../entities/fakeRoleEntity'

@injectable()
export class FakeRoleRepository implements IRoleRepository {
  async create(_input: IRoleEntity): Promise<IRoleEntity> {
    return fakeCreatedRoleEntity
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

  async findAll(_input: IInputFindAllRole): Promise<IFindAllPaginated | void> {
    return void 0
  }
}

export const fakeRoleRepositoryFindBy = jest.spyOn(
  FakeRoleRepository.prototype,
  'findBy'
)

export const fakeRoleRepositoryCreate = jest.spyOn(
  FakeRoleRepository.prototype,
  'create'
)

export const fakeRoleRepositoryUpdate = jest.spyOn(
  FakeRoleRepository.prototype,
  'update'
)

export const fakeRoleRepositoryDelete = jest.spyOn(
  FakeRoleRepository.prototype,
  'delete'
)

export const fakeRoleRepositoryFindAll = jest.spyOn(
  FakeRoleRepository.prototype,
  'findAll'
)
