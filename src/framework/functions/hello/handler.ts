import { middyfy } from 'src/framework/utility/lamba'
import { APIGatewayProxyEvent } from 'aws-lambda'

const create = async (_event: APIGatewayProxyEvent) => ({
  message: `Hello world!`,
})

export const handler = middyfy(create)
