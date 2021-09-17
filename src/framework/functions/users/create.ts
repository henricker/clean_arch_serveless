import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import { middyfy } from 'src/framework/utility/lamba'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { httpResponse } from '../../utility/httpResponse'
import { IError } from '@shared/IError'
import { connectTypeorm } from '@framework/utility/database'
import { HandlerInput, HandlerResult } from '@framework/utility/types'

const create = async (event: HandlerInput): Promise<HandlerResult> => {
	try {
		await connectTypeorm()

		const input = new InputCreateUser(event.body as Object)

		const operator = container.get(CreateUserOperator)

		const userResult = await operator.run(input)

		if (userResult.isLeft()) {
			throw userResult.value
		}

		return httpResponse('created', userResult.value)
	} catch (error) {
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
