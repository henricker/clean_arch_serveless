import { Sequelize } from 'sequelize/types'
import { ConnectionManager } from 'sequelize/types/lib/connection-manager'

interface ICustomConnectionManager extends ConnectionManager {
  pool?: {
    drain: () => Promise<void>
    destroyAllNow: () => Promise<void>
  }
}

export interface ICustomSequelize extends Sequelize {
  connectionManager: ICustomConnectionManager
}
