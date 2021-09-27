import { DeleteAdressUseCase } from '@business/useCases/adress/deleteAdressUseCase'
import { InputDeleteAdress } from '@controller/serializers/adresses/deleteAdress'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class DeleteAdressOperator extends AbstractOperator<
  InputDeleteAdress,
  Either<IError, void>
> {
  constructor(
    @inject(DeleteAdressUseCase)
    private deleteAdressUseCase: DeleteAdressUseCase
  ) {
    super()
  }

  async run(input: InputDeleteAdress): Promise<Either<IError, void>> {
    this.exec(input)

    const adressDeleteResult = await this.deleteAdressUseCase.exec(input)

    if (adressDeleteResult.isLeft()) {
      return left(adressDeleteResult.value)
    }

    return right(void 0)
  }
}
