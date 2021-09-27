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
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { AdressEntity } from '@domain/entities/adressEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateAdressUseCase
  implements IAbstractUseCase<IInputCreateAdress, IOutputCreateAdress>
{
  constructor(
    @inject(IAdressRepositoryToken) private adressRepository: IAdressRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifierService: IUniqueIdentifierService
  ) {}

  async exec(
    input: IInputCreateAdress,
    options: IUseCaseOptions = {}
  ): Promise<IOutputCreateAdress> {
    const adressEntity = AdressEntity.create(input)

    try {
      const adress = await this.adressRepository.create(
        {
          ...adressEntity.value.export(),
          uuid: this.uniqueIdentifierService.create(),
        },
        {
          transaction: options.transaction,
        }
      )

      return right(adress)
    } catch (error) {
      return left(AdressesError.adressFailedToCreate())
    }
  }
}
