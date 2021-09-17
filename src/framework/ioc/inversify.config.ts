import { container } from '@shared/ioc/container'
import { operatorModule } from './operatorModule'
import { repositoryModule } from './repositoryModule'
import { servicesModule } from './servicesModule'
import { useCaseModule } from './useCaseModule'

container.load(servicesModule)
container.load(repositoryModule)
container.load(useCaseModule)
container.load(operatorModule)
