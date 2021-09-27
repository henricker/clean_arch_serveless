import {
  IInputDeleteAdress,
  IOutputDeleteAdress,
} from '@business/dto/adress/delete'
import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import {
  IAdressRepository,
  IAdressRepositoryToken,
} from '@business/repositories/adress/iAdressRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeleteAdressUseCase
  implements IAbstractUseCase<IInputDeleteAdress, IOutputDeleteAdress>
{
  constructor(
    @inject(IAdressRepositoryToken) private adressRepository: IAdressRepository
  ) {}

  async exec(input: IInputDeleteAdress): Promise<IOutputDeleteAdress> {
    try {
      await this.adressRepository.delete({
        deleteWhere: { type: 'uuid', key: input.uuid },
      })

      return right(void 0)
    } catch (error) {
      return left(AdressesError.adressFailedDelete())
    }
  }
}
