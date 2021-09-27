import '@root/src/4-framework/ioc/inversify.config'
import { httpResponse } from '@root/src/4-framework/utility/httpResponse'
import { middyfy } from '@root/src/4-framework/utility/lamba'
import {
  IHandlerInput,
  IHandlerResult,
} from '@root/src/4-framework/utility/types'
import { container } from '@shared/ioc/container'
import { IError } from '@shared/IError'
import { RecoverPasswordOperator } from '@root/src/3-controller/operations/user/recoverPassword'
import { InputRecoverPassword } from '@root/src/3-controller/serializers/user/inputRecoverPassword'

const forgotPassword = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const operator = container.get(RecoverPasswordOperator)

    const input = new InputRecoverPassword({
      userEmail: event.body.userEmail,
      redirectUrl: event.body.redirectUrl,
    })

    const userResult = await operator.run(input)

    if (userResult.isLeft()) {
      throw userResult.value
    }

    return httpResponse('ok', userResult.value)
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    console.error(error)

    return httpResponse('internalError', { message: 'internal error' })
  }
}

export const handler = middyfy(forgotPassword)
