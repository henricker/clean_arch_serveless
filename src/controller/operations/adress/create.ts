import { CreateAdressUseCase } from '@business/useCases/adress/createAdressUseCase'
import { InputCreateAdress } from '@controller/serializers/adresses/createAdress'
import { IAdressEntity } from '@domain/entities/adressEntity'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateAdressOperator extends AbstractOperator<
  InputCreateAdress,
  Either<IError, IAdressEntity>
> {
  constructor(
    @inject(CreateAdressUseCase)
    private createAdressUseCase: CreateAdressUseCase
  ) {
    super()
  }

  async run(input: InputCreateAdress): Promise<Either<IError, IAdressEntity>> {
    this.exec(input)

    const adressResult = await this.createAdressUseCase.exec(input)

    if (adressResult.isLeft()) {
      return left(adressResult.value)
    }

    return right(adressResult.value)
  }
}
