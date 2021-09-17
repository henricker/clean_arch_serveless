import { middyfy } from 'src/framework/utility/lamba'
import { APIGatewayProxyEvent } from 'aws-lambda'

const create = async (_event: APIGatewayProxyEvent) => {
	return {
		message: `Hello world!`,
	}
}

export const handler = middyfy(create)
