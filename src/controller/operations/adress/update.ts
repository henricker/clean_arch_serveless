import { IOutputUpdateAdress } from '@business/dto/adress/update'
import { UpdateAdressUseCase } from '@business/useCases/adress/updateAdressUseCase'
import { InputUpdateAdress } from '@controller/serializers/adresses/updateAdress'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class UpdateAdressOperator extends AbstractOperator<
  InputUpdateAdress,
  IOutputUpdateAdress
> {
  constructor(
    @inject(UpdateAdressUseCase)
    private updateAdressUseCase: UpdateAdressUseCase
  ) {
    super()
  }

  async run(
    input: InputUpdateAdress,
    adress_uuid: string
  ): Promise<IOutputUpdateAdress> {
    this.exec(input)

    const adressResult = await this.updateAdressUseCase.exec(input, {
      type: 'uuid',
      key: adress_uuid,
    })

    if (adressResult.isLeft()) {
      return left(adressResult.value)
    }

    return right(adressResult.value)
  }
}
