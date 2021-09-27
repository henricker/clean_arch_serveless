import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@root/src/2-business/repositories/role/iRoleRepository'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@root/src/2-business/repositories/user/iUserRepository'
import { RoleRepository } from '@root/src/4-framework/repositories/RoleRepository'
import { UserRepository } from '@root/src/4-framework/repositories/UserRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepository)
})
