import { createConnection } from 'typeorm'
import typeormConfig from '@root/ormconfig'

export const connectTypeorm = () => createConnection(typeormConfig)
