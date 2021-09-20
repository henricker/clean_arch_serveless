import knexconfig from '@root/knexfile'
import knex from 'knex'

export const Database = knex(knexconfig)
