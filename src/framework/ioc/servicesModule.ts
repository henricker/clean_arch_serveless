import {
	IHasherService,
	IHasherServiceToken,
} from '@business/services/hasher/iHasher'
import {
	IUniqueIdentifierService,
	IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { ContainerModule, interfaces } from 'inversify'
import { HasherService } from '../services/hasher/hasherService'
import { UniqueIdentifierService } from '../services/uniqueIdentifier/uniqueIdentifierService'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<IHasherService>(IHasherServiceToken).to(HasherService)
	bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(
		UniqueIdentifierService
	)
})
