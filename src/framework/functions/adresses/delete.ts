import { container } from '@shared/ioc/container'
import '../../ioc/inversify.config'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lamba'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { Context } from 'vm'
import { InputDeleteAdress } from '@controller/serializers/adresses/deleteAdress'
import { DeleteAdressOperator } from '@controller/operations/adress/delete'

const updateAdresses = async (
  event: IHandlerInput,
  _context: Context
): Promise<IHandlerResult> => {
  try {
    const input = new InputDeleteAdress({
      uuid: event.pathParameters.adress_uuid,
    })

    const operator = container.get(DeleteAdressOperator)

    const adressResult = await operator.run(input)

    if (adressResult.isLeft()) {
      throw adressResult.value
    }

    return httpResponse('ok', adressResult.value)
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    return httpResponse('internalError', {
      message: 'There were an internal error while deleting this adress',
    })
  }
}

export const handler = middyfy(updateAdresses)
