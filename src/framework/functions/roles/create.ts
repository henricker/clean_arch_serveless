import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { InputCreateRole } from '@controller/serializers/role/inputCreateRole'
import { IHandlerInput } from '@framework/utility/types'
import { Context } from 'aws-lambda'
import { CreateRoleOperator } from '@controller/operations/roles/createRole'
import { httpResponse } from '@framework/utility/httpResponse'
import { IError } from '@shared/IError'
import { middyfy } from '@framework/utility/lamba'
import { AuthMiddyMiddleware } from '@framework/middlewares/auth'

const createRole = async (event: IHandlerInput, _context: Context) => {
  try {
    const inputCreateRole = new InputCreateRole({
      profile: event.body.profile,
    })

    const operator = container.get(CreateRoleOperator)

    const roleResult = await operator.run(inputCreateRole, event.auth.user_id)

    if (roleResult.isLeft()) {
      throw roleResult.value
    }

    return httpResponse('ok', roleResult.value)
  } catch (error) {
    console.error(error)
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    return httpResponse('internalError', 'Internal server error in role create')
  }
}

export const handler = middyfy(createRole).use(AuthMiddyMiddleware())
