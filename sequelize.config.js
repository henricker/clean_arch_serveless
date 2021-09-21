require('dotenv').config()

const STAGE = process.env.STAGE ?? 'dev'

let config = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  database: process.env.MYSQL_DB || 'serverless',
  dialect: 'mysql',
}

if (['prod', 'production'].includes(STAGE.toLocaleLowerCase())) {
  config = {
    host: process.env.PROD_MYSQL_HOST,
    port: process.env.PROD_MYSQL_PORT,
    username: process.env.PROD_MYSQL_USER,
    password: process.env.PROD_MYSQL_PASS,
    database: process.env.PROD_MYSQL_NAME,
    dialect: 'mysql',
  }
}

module.exports = config
