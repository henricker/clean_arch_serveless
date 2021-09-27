import { CreateTokenUseCase } from '@root/src/2-business/useCases/authentication/createToken'
import { VerifyProfileUseCase } from '@root/src/2-business/useCases/role/verifyProfileUseCase'
import { FindRoleByUseCase } from '@root/src/2-business/useCases/role/findRoleByUseCase'
import { CreateUserUseCase } from '@root/src/2-business/useCases/user/createUserUseCase'
import { FindUserByUseCase } from '@root/src/2-business/useCases/user/findUserByUseCase'
import { SendMailUseCase } from '@root/src/2-business/useCases/user/sendMailUseCase'
import { UpdateUserUseCase } from '@root/src/2-business/useCases/user/updateUserUseCase'
import { ContainerModule, interfaces } from 'inversify'
import { UpdateRoleUseCase } from '@root/src/2-business/useCases/role/updateRoleUseCase'
import { CreateRoleUseCase } from '@root/src/2-business/useCases/role/createRoleUseCase'
import { DeleteRoleUseCase } from '@root/src/2-business/useCases/role/deleteRoleUseCase'
import { FindAllRolesUseCase } from '@root/src/2-business/useCases/role/findAllRolesUseCase'

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
  bind(FindAllRolesUseCase).to(FindAllRolesUseCase)
})
