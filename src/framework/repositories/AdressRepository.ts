import { IInputCreateAdress } from '@business/dto/adress/create'
import {
  IAdressRepository,
  IInputUpdateAdressRepository,
} from '@business/repositories/adress/iAdressRepository'
import { IRepositoryOptions } from '@business/repositories/repositoryOptions'
import { IWhere } from '@business/repositories/where'
import { IAdressEntity } from '@domain/entities/adressEntity'
import { AdressModel } from '@framework/models/adresses/adressModel'
import { inject, injectable } from 'inversify'
import { Transaction } from 'sequelize/types'

@injectable()
export class AdressRepository implements IAdressRepository {
  constructor(@inject(AdressModel) private adressModel: typeof AdressModel) {}

  async create(
    input: IInputCreateAdress,
    options?: IRepositoryOptions
  ): Promise<IAdressEntity> {
    const adress = await this.adressModel.create(input, {
      transaction: options.transaction as Transaction,
    })

    return adress.get({ plain: true })
  }
  async update(
    input: IInputUpdateAdressRepository
  ): Promise<Partial<IAdressEntity>> {
    await this.adressModel.update(input.newData, {
      where: { [input.updateWhere.type]: input.updateWhere.key },
    })

    return input.newData
  }

  async delete(input: {
    deleteWhere: IWhere<
      keyof Pick<IAdressEntity, 'id' | 'uuid'>,
      number | string
    >
  }): Promise<void> {
    await this.adressModel.destroy({
      where: { [input.deleteWhere.type]: input.deleteWhere.key },
    })

    return void 0
  }
}
