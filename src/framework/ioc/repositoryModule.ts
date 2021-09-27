import {
  IAdressRepository,
  IAdressRepositoryToken,
} from '@business/repositories/adress/iAdressRepository'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { AdressRepository } from '@framework/repositories/AdressRepository'
import { RoleRepository } from '@framework/repositories/RoleRepository'
import { UserRepository } from '@framework/repositories/UserRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepository)
  bind<IAdressRepository>(IAdressRepositoryToken).to(AdressRepository)
})
