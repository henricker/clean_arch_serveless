import { IInputCreateAdress } from '@business/dto/adress/create'
import {
  IAdressRepository,
  IInputUpdateAdressRepository,
} from '@business/repositories/adress/iAdressRepository'
import { IWhere } from '@business/repositories/where'
import { IAdressEntity } from '@domain/entities/adressEntity'
import { injectable } from 'inversify'
import { fakeAdressEntity } from '../entities/fakeAdressEntity'

@injectable()
export class FakeAdressRepositoy implements IAdressRepository {
  async create(_input: IInputCreateAdress): Promise<IAdressEntity> {
    return fakeAdressEntity
  }

  async update(
    _input: IInputUpdateAdressRepository
  ): Promise<Partial<IAdressEntity>> {
    return {}
  }

  async delete(_input: {
    deleteWhere: IWhere<
      keyof Pick<IAdressEntity, 'id' | 'uuid'>,
      number | string
    >
  }): Promise<void> {
    return void 0
  }
}

export const fakeAdressRepositoryCreate = jest.spyOn(
  FakeAdressRepositoy.prototype,
  'create'
)

export const fakeAdressRepositoryUpdate = jest.spyOn(
  FakeAdressRepositoy.prototype,
  'update'
)

export const fakeAdressRepositoryDelete = jest.spyOn(
  FakeAdressRepositoy.prototype,
  'delete'
)
