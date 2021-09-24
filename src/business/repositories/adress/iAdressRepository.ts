import { IInputCreateAdress } from '@business/dto/adress/create'
import { IAdressEntity } from '@domain/entities/adressEntity'
import { IRepositoryOptions } from '../repositoryOptions'

export const IAdressRepositoryToken = Symbol.for('IAdressRepositoryToken')

export interface IAdressRepository {
  create(
    input: IInputCreateAdress,
    options?: IRepositoryOptions
  ): Promise<IAdressEntity>
}
