import { middyfy } from '@root/src/4-framework/utility/lamba'
import { APIGatewayProxyEvent } from 'aws-lambda'

const create = async (_event: APIGatewayProxyEvent) => ({
  message: `Hello world!`,
})

export const handler = middyfy(create)
