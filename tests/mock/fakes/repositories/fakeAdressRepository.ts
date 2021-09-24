import { IInputCreateAdress } from '@business/dto/adress/create'
import { IAdressRepository } from '@business/repositories/adress/iAdressRepository'
import { IAdressEntity } from '@domain/entities/adressEntity'
import { injectable } from 'inversify'
import { fakeAdressEntity } from '../entities/fakeAdressEntity'

@injectable()
export class FakeAdressRepositoy implements IAdressRepository {
  async create(_input: IInputCreateAdress): Promise<IAdressEntity> {
    return fakeAdressEntity
  }
}

export const fakeAdressRepositoryCreate = jest.spyOn(
  FakeAdressRepositoy.prototype,
  'create'
)
