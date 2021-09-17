import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { Context } from 'aws-lambda'

export const middyfy = (handler: (e: any, contex?: Context) => Object) =>
	middy(handler)
		.use(jsonBodyParser())
		.use({
			before: (handler, next) => {
				console.log(handler)

				next()
			},
		})
