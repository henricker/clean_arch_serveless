import { IAdressEntity } from '@domain/entities/adressEntity'
import { IRepositoryOptions } from '../repositoryOptions'
import { IWhere } from '../where'

export const IAdressRepositoryToken = Symbol.for('IAdressRepositoryToken')

export interface IInputUpdateAdressRepository {
  updateWhere: IWhere<keyof Pick<IAdressEntity, 'id' | 'uuid'>, number | string>
  newData: Partial<IAdressEntity>
}

export interface IAdressRepository {
  create(
    input: IAdressEntity,
    options?: IRepositoryOptions
  ): Promise<IAdressEntity>
  update(input: IInputUpdateAdressRepository): Promise<Partial<IAdressEntity>>
  delete(input: {
    deleteWhere: IWhere<
      keyof Pick<IAdressEntity, 'id' | 'uuid'>,
      number | string
    >
  }): Promise<void>
}
