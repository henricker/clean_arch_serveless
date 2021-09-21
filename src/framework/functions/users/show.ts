import '@framework/ioc/inversify.config'
import { httpResponse } from '@framework/utility/httpResponse'
import { AuthMiddyMiddleware } from '@framework/middlewares/auth'
import { middyfy } from '@framework/utility/lamba'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { container } from '@shared/ioc/container'
import { ShowUserOperator } from '@controller/operations/user/showUser'
import { InputShowUser } from '@controller/serializers/user/inputShowUser'
import { IError } from '@shared/IError'

const show = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const operator = container.get(ShowUserOperator)

    const input = new InputShowUser({
      user_uuid: event.pathParameters.uuid,
    })

    const userResult = await operator.run(input, event.auth?.user_id)

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

export const handler = middyfy(show).use(AuthMiddyMiddleware())
