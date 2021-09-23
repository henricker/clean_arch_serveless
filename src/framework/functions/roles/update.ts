import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { InputUpdateRole } from '@controller/serializers/role/inputUpdateRole'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { Context } from 'aws-lambda'
import { UpdateRoleOperator } from '@controller/operations/roles/updateRole'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lamba'
import { AuthMiddyMiddleware } from '@framework/middlewares/auth'
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
