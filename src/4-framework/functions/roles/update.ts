import { container } from '@shared/ioc/container'
import '@root/src/4-framework/ioc/inversify.config'
import { InputUpdateRole } from '@root/src/3-controller/serializers/role/inputUpdateRole'
import {
  IHandlerInput,
  IHandlerResult,
} from '@root/src/4-framework/utility/types'
import { Context } from 'aws-lambda'
import { UpdateRoleOperator } from '@root/src/3-controller/operations/roles/updateRole'
import { httpResponse } from '@root/src/4-framework/utility/httpResponse'
import { middyfy } from '@root/src/4-framework/utility/lamba'
import { AuthMiddyMiddleware } from '@root/src/4-framework/middlewares/auth'
import { IError } from '@shared/IError'

const updateRole = async (
  event: IHandlerInput,
  _context: Context
): Promise<IHandlerResult> => {
  try {
    const inputUpdateRole = new InputUpdateRole({
      id: +event.pathParameters.id,
      profile: event.body.profile,
    })

    const operator = container.get(UpdateRoleOperator)

    const roleResult = await operator.run(inputUpdateRole, event.auth.user_id)

    if (roleResult.isLeft()) {
      throw roleResult.value
    }

    return httpResponse('ok', roleResult.value)
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }
    console.error(error)
    return httpResponse('internalError', 'Internal server error in role update')
  }
}

export const handler = middyfy(updateRole).use(AuthMiddyMiddleware())
