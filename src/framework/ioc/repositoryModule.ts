import {
	IRoleRepository,
	IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
	IUserRepository,
	IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { RoleRepository } from '@framework/repositories/RoleRepository'
import { ContainerModule, interfaces } from 'inversify'
import { UserRepository } from '../repositories/UserRepository'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
	bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepository)
})
