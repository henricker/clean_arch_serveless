import { CreateTokenUseCase } from '@business/useCases/authentication/createToken'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { SendMailUseCase } from '@business/useCases/user/sendMailUseCase'
import { UpdateUserUseCase } from '@business/useCases/user/updateUserUseCase'
import { ContainerModule, interfaces } from 'inversify'
import { UpdateRoleUseCase } from '@business/useCases/role/updateRoleUseCase'
import { CreateRoleUseCase } from '@business/useCases/role/createRoleUseCase'
import { DeleteRoleUseCase } from '@business/useCases/role/deleteRoleUseCase'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase)
  bind(FindUserByUseCase).to(FindUserByUseCase)
  bind(FindRoleByUseCase).to(FindRoleByUseCase)
  bind(CreateTokenUseCase).to(CreateTokenUseCase)
  bind(VerifyProfileUseCase).to(VerifyProfileUseCase)
  bind(SendMailUseCase).to(SendMailUseCase)
  bind(UpdateUserUseCase).to(UpdateUserUseCase)
  bind(CreateRoleUseCase).to(CreateRoleUseCase)
  bind(UpdateRoleUseCase).to(UpdateRoleUseCase)
  bind(DeleteRoleUseCase).to(DeleteRoleUseCase)
})
