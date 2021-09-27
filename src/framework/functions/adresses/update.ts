import { container } from '@shared/ioc/container'
import '../../ioc/inversify.config'
import { UpdateAdressOperator } from '@controller/operations/adress/update'
import { InputUpdateAdress } from '@controller/serializers/adresses/updateAdress'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lamba'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { Context } from 'vm'

const updateAdresses = async (
  event: IHandlerInput,
  _context: Context
): Promise<IHandlerResult> => {
  try {
    const input = new InputUpdateAdress({
      street: event.body.street,
      city: event.body.city,
      state: event.body.state,
      country: event.body.country,
      postal_code: +event.body.postal_code,
    })

    const operator = container.get(UpdateAdressOperator)

    const adressResult = await operator.run(
      input,
      event.pathParameters.adress_uuid
    )

    if (adressResult.isLeft()) {
      throw adressResult.value
    }

    return httpResponse('ok', adressResult.value)
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    return httpResponse('internalError', {
      message: 'There were an internal error while updating this adress, sorry',
    })
  }
}

export const handler = middyfy(updateAdresses)
