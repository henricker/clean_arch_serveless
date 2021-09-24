import { IHandlerInput } from '@framework/utility/types'
import '@framework/ioc/inversify.config'
import { container } from '@shared/ioc/container'
import { Context } from 'aws-lambda'
import { DeleteRoleOperator } from '@controller/operations/roles/deleteRole'
import { InputDeleteRole } from '@controller/serializers/role/inputDeleteRole'
import { httpResponse } from '@framework/utility/httpResponse'
import { IError } from '@shared/IError'
import { middyfy } from '@framework/utility/lamba'
import { AuthMiddyMiddleware } from '@framework/middlewares/auth'

const deleteRole = async (event: IHandlerInput, _context: Context) => {
  const inputDeleteRole = new InputDeleteRole({
    id: +event.pathParameters.id,
  })
  const operator = container.get(DeleteRoleOperator)
  try {
    const roleResult = await operator.run(inputDeleteRole, event.auth.user_id)
    if (roleResult.isLeft()) {
      throw roleResult.value
    }

    return httpResponse('noContent', '')
  } catch (error) {
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    return httpResponse('internalError', 'Internal server error in delete role')
  }
}

export const handler = middyfy(deleteRole).use(AuthMiddyMiddleware())
