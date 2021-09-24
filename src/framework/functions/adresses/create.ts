import { container } from '@shared/ioc/container'
import '../../ioc/inversify.config'
import { CreateAdressOperator } from '@controller/operations/adress/create'
import { InputCreateAdress } from '@controller/serializers/adresses/createAdress'
import { httpResponse } from '@framework/utility/httpResponse'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { Context } from 'aws-lambda'
import { middyfy } from '@framework/utility/lamba'

const createAdress = async (
  event: IHandlerInput,
  _context: Context
): Promise<IHandlerResult> => {
  try {
    const input = new InputCreateAdress({
      street: event.body.street,
      city: event.body.city,
      country: event.body.country,
      postal_code: +event.body.postal_code,
      state: event.body.state,
    })

    const operator = container.get(CreateAdressOperator)

    const adressResult = await operator.run(input)

    if (adressResult.isLeft()) {
      throw adressResult.value
    }

    return httpResponse('created', adressResult.value)
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    return httpResponse('internalError', {
      message: 'An internal error occurred in create adress',
    })
  }
}

export const handler = middyfy(createAdress)
