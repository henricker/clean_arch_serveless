import { container } from '@shared/ioc/container'
import '@root/src/4-framework/ioc/inversify.config'
import { middyfy } from '@root/src/4-framework/utility/lamba'
import { IError } from '@shared/IError'
import {
  IHandlerInput,
  IHandlerResult,
} from '@root/src/4-framework/utility/types'
import { CreateAuthenticationOperator } from '@root/src/3-controller/operations/authentication/createAuthentication'
import { InputCreateAuthentication } from '@root/src/3-controller/serializers/authenticator/inputCreateAuthetication'
import { httpResponse } from '../../utility/httpResponse'

const create = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const operator = container.get(CreateAuthenticationOperator)

    const input = new InputCreateAuthentication(event.body)

    const authenticationResult = await operator.run(input)

    if (authenticationResult.isLeft()) {
      throw authenticationResult.value
    }

    return httpResponse('ok', authenticationResult.value)
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    console.error(error)

    return httpResponse(
      'internalError',
      'Internal server error in user creation'
    )
  }
}

export const handler = middyfy(create)
