import { CreateTokenUseCase } from '@business/useCases/authentication/createToken'
import { AuthorizeUseCase } from '@business/useCases/role/authorizeUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
	bind(CreateUserUseCase).to(CreateUserUseCase)
	bind(FindUserByUseCase).to(FindUserByUseCase)
	bind(FindRoleByUseCase).to(FindRoleByUseCase)
	bind(CreateTokenUseCase).to(CreateTokenUseCase)
	bind(AuthorizeUseCase).to(AuthorizeUseCase)
})
