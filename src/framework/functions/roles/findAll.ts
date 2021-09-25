import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { FindAllRolesOperator } from '@controller/operations/roles/findAllRoles'
import { AuthMiddyMiddleware } from '@framework/middlewares/auth'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lamba'
import { IHandlerInput } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { Context } from 'aws-lambda'
import { InputFindAllRole } from '@controller/serializers/role/inputFindAllRole'
import { IInputFindAllRole } from '@business/repositories/role/iRoleRepository'

const findAllRoles = async (event: IHandlerInput, _context: Context) => {
  const operator = container.get(FindAllRolesOperator)
  try {
    const requestInput: IInputFindAllRole = {
      page: +event.queryStringParameters?.page || 1,
      limit: +event.queryStringParameters?.limit || 10,
    }
    const inputRoles = new InputFindAllRole(requestInput)
    const rolesResult = await operator.run(inputRoles, event.auth.user_id)

    if (rolesResult.isLeft()) {
      throw rolesResult.value
    }

    return httpResponse('ok', rolesResult.value)
  } catch (error) {
    console.log(error)
    if (error instanceof IError) {
      return httpResponse(error.statusCode, error.body)
    }

    return httpResponse(
      'internalError',
      'Internal Server Error in findAll roles'
    )
  }
}

export const handler = middyfy(findAllRoles).use(AuthMiddyMiddleware())
