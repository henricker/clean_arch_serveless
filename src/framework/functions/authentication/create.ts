import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { middyfy } from 'src/framework/utility/lamba'
import { httpResponse } from '../../utility/httpResponse'
import { IError } from '@shared/IError'
import { connectTypeorm } from '@framework/utility/database'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { CreateAuthenticationOperator } from '@controller/operations/authentication/createAuthentication'
import { InputCreateAuthentication } from '@controller/serializers/authenticator/inputCreateAuthetication'

const create = async (event: IHandlerInput): Promise<IHandlerResult> => {
	const con = await connectTypeorm()
	try {
		const operator = container.get(CreateAuthenticationOperator)

		const input = new InputCreateAuthentication(event.body)

		const authenticationResult = await operator.run(input)

		if (authenticationResult.isLeft()) {
			throw authenticationResult.value
		}

		await con.close()
		return httpResponse('ok', authenticationResult.value)
	} catch (error) {
		await con.close()

		if (error instanceof IError) {
			return httpResponse(error.statusCode, error.body)
		}

		console.error(error)

		return httpResponse(
			'internalError',
			'Internal server error in user creation'
		)
	}
}

export const handler = middyfy(create)
