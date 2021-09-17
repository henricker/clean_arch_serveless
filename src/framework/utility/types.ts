import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export interface HandlerInput extends Omit<APIGatewayProxyEvent, 'body'> {
	body: { [k: string]: string | undefined }
}

export interface HandlerResult extends Omit<APIGatewayProxyResult, 'body'> {
	body: Object
}
