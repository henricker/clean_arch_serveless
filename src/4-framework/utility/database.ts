import { Sequelize, Options } from 'sequelize'
import sequelizeConfig from '@root/sequelize.config.js'
import { ICustomSequelize } from '@framework/repositories/@types/sequelize'

const connectionOptions: Options = {
  ...sequelizeConfig,
  define: { underscored: true, omitNull: false },
  pool: {
    max: 5,
    min: 0,
  },
  dialectOptions: {
    connectTimeout: 60000,
  },
}

export const sequelize: ICustomSequelize = new Sequelize(connectionOptions)
