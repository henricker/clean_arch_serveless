import { IHandlerInput } from '@root/src/4-framework/utility/types'
import '@root/src/4-framework/ioc/inversify.config'
import { container } from '@shared/ioc/container'
import { Context } from 'aws-lambda'
import { DeleteRoleOperator } from '@root/src/3-controller/operations/roles/deleteRole'
import { InputDeleteRole } from '@root/src/3-controller/serializers/role/inputDeleteRole'
import { httpResponse } from '@root/src/4-framework/utility/httpResponse'
import { IError } from '@shared/IError'
import { middyfy } from '@root/src/4-framework/utility/lamba'
import { AuthMiddyMiddleware } from '@root/src/4-framework/middlewares/auth'

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
