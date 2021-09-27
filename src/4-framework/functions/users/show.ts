import '@root/src/4-framework/ioc/inversify.config'
import { httpResponse } from '@root/src/4-framework/utility/httpResponse'
import { AuthMiddyMiddleware } from '@root/src/4-framework/middlewares/auth'
import { middyfy } from '@root/src/4-framework/utility/lamba'
import {
  IHandlerInput,
  IHandlerResult,
} from '@root/src/4-framework/utility/types'
import { container } from '@shared/ioc/container'
import { ShowUserOperator } from '@root/src/3-controller/operations/user/showUser'
import { InputShowUser } from '@root/src/3-controller/serializers/user/inputShowUser'
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
