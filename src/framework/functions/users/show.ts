import '@framework/ioc/inversify.config'
import { httpResponse } from '@framework/utility/httpResponse'
import { AuthMiddyMiddleware } from '@framework/middlewares/auth'
import { middyfy } from '@framework/utility/lamba'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'

const privateFunc = async (event: IHandlerInput): Promise<IHandlerResult> => {
	return httpResponse('ok', { welcome: `user id: ${event.auth.user_id}` })
}

export const handler = middyfy(privateFunc).use(AuthMiddyMiddleware())
