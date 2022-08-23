import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import jsonBodyParser from '@middy/http-json-body-parser'
import { Context } from 'aws-lambda'
import { sequelize } from './database'

export const middyfy = (
  handler: (e: unknown, contex?: Context) => unknown
): middy.Middy<unknown, unknown, Context> =>
  middy((e: unknown, c: Context) => {
    sequelize.connectionManager.initPools()
    // eslint-disable-next-line no-prototype-builtins
    if (sequelize.connectionManager.hasOwnProperty('getConnection')) {
      delete sequelize.connectionManager.getConnection
    }
    // eslint-disable-next-line no-param-reassign
    c.callbackWaitsForEmptyEventLoop = false
    return handler(e, c)
  })
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(httpCors())
    .after(async () => {
      await sequelize.connectionManager.pool.drain()
      return sequelize.connectionManager.pool.destroyAllNow()
    })
