import '@framework/ioc/inversify.config'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lamba'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { container } from '@shared/ioc/container'
import { IError } from '@shared/IError'
import { RecoverPasswordOperator } from '@controller/operations/user/recoverPassword'
import { InputRecoverPassword } from '@controller/serializers/user/inputRecoverPassword'

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
