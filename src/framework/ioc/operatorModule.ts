import { CreateAuthenticationOperator } from '@controller/operations/authentication/createAuthentication'
import { UpdateRoleOperator } from '@controller/operations/roles/updateRole'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { RecoverPasswordOperator } from '@controller/operations/user/recoverPassword'
import { ShowUserOperator } from '@controller/operations/user/showUser'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
  bind(CreateAuthenticationOperator).to(CreateAuthenticationOperator)
  bind(ShowUserOperator).to(ShowUserOperator)
  bind(RecoverPasswordOperator).to(RecoverPasswordOperator)
  bind(UpdateRoleOperator).to(UpdateRoleOperator)
})
