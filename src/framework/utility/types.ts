import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export interface ITokenPayload {
	user_id: number
	user_uuid: string
	[index: string]: string | number
}

export interface IHandlerInput<T = ITokenPayload>
	extends Omit<APIGatewayProxyEvent, 'body'> {
	body: { [k: string]: string | undefined }
	auth?: T
}

export interface IHandlerResult extends Omit<APIGatewayProxyResult, 'body'> {
	body: Object
}
