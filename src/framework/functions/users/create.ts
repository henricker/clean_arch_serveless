import { container } from '@shared/ioc/container'
import { middyfy } from 'src/framework/utility/lamba'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { httpResponse } from '../../utility/httpResponse'
import { IError } from '@shared/IError'

const create = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
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

		return httpResponse(
			'internalError',
			'Internal server error in user creation'
		)
	}
}

export const handler = middyfy(create)
