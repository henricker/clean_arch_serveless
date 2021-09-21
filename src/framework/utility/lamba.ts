import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import jsonBodyParser from '@middy/http-json-body-parser'
import { Context } from 'aws-lambda'

export const middyfy = (handler: (e: any, contex?: Context) => Object) =>
	middy(handler).use(jsonBodyParser()).use(httpErrorHandler()).use(httpCors())
