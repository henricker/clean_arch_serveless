import {
  IInputCreateAdress,
  IOutputCreateAdress,
} from '@business/dto/adress/create'
import { IUseCaseOptions } from '@business/dto/useCaseOptions'
import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import {
  IAdressRepository,
  IAdressRepositoryToken,
} from '@business/repositories/adress/iAdressRepository'
import { AdressEntity } from '@domain/entities/adressEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateAdressUseCase
  implements IAbstractUseCase<IInputCreateAdress, IOutputCreateAdress>
{
  constructor(
    @inject(IAdressRepositoryToken) private adressRepository: IAdressRepository
  ) {}

  async exec(
    input: IInputCreateAdress,
    options: IUseCaseOptions = {}
  ): Promise<IOutputCreateAdress> {
    const userEntity = AdressEntity.create(input)

    try {
      const user = await this.adressRepository.create(
        userEntity.value.export(),
        {
          transaction: options.transaction,
        }
      )

      return right(user)
    } catch (error) {
      return left(AdressesError.adressFailedToCreate())
    }
  }
}
