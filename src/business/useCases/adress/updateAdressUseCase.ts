import {
  IInputUpdateAdress,
  IOutputUpdateAdress,
} from '@business/dto/adress/update'
import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import {
  IAdressRepository,
  IAdressRepositoryToken,
} from '@business/repositories/adress/iAdressRepository'
import { IWhere } from '@business/repositories/where'
import { removeNullish } from '@controller/utility/removeNullish'
import { AdressEntity, IAdressEntity } from '@domain/entities/adressEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateAdressUseCase
  implements IAbstractUseCase<IInputUpdateAdress, IOutputUpdateAdress>
{
  constructor(
    @inject(IAdressRepositoryToken) private adressRepository: IAdressRepository
  ) {}

  async exec(
    input: IInputUpdateAdress,
    updateWhere: IWhere<
      keyof Pick<IAdressEntity, 'id' | 'uuid'>,
      number | string
    >
  ): Promise<IOutputUpdateAdress> {
    try {
      const newAdressEntity = AdressEntity.update(input)

      const newAdress = newAdressEntity.value.export()

      const formatedAdress = removeNullish({
        street: newAdress.street,
        city: newAdress.city,
        state: newAdress.state,
        country: newAdress.country,
        postal_code: newAdress.postal_code,
        created_at: newAdress.created_at,
        updated_at: newAdress.updated_at,
      }) as Partial<IAdressEntity>

      const adressResult = await this.adressRepository.update({
        newData: formatedAdress,
        updateWhere,
      })

      return right(adressResult)
    } catch (error) {
      return left(AdressesError.adressFailedUpdate())
    }
  }
}
