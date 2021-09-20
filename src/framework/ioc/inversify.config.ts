import { sequelize } from '@framework/utility/database'
import { container } from '@shared/ioc/container'
import { modelsModule } from './modelsModule'
import { operatorModule } from './operatorModule'
import { repositoryModule } from './repositoryModule'
import { servicesModule } from './servicesModule'
import { useCaseModule } from './useCaseModule'

container.bind('sequelize').toConstantValue(sequelize)
container.load(servicesModule)
container.load(repositoryModule)
container.load(useCaseModule)
container.load(operatorModule)
container.load(modelsModule)
