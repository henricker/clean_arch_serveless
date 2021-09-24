import {
  IInputUpdateUser,
  IUserRepository,
  UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import { InputUserEntity, IUserEntity } from '@domain/entities/userEntity'
import { injectable } from 'inversify'

@injectable()
export class FakeUserRepository implements IUserRepository {
  async create(i: InputUserEntity, role_id: number): Promise<IUserEntity> {
    return {
      ...i,
      id: 1,
      role_id,
      uuid: 'uuid-uuid-1234-uuid',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
  async findBy(
    _t: UserEntityKeys,
    _v: IUserEntity[UserEntityKeys]
  ): Promise<IUserEntity | void> {
    return void 0
  }

  async update(_input: IInputUpdateUser): Promise<IUserEntity | void> {
    return void 0
  }
}

export const fakeUserRepositoryFindBy = jest.spyOn(
  FakeUserRepository.prototype,
  'findBy'
)

export const fakeUserRepositoryCreate = jest.spyOn(
  FakeUserRepository.prototype,
  'create'
)

export const fakeUserRepositoryUpdate = jest.spyOn(
  FakeUserRepository.prototype,
  'update'
)
