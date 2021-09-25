import { CreateAuthenticationOperator } from '@controller/operations/authentication/createAuthentication'
import { CreateRoleOperator } from '@controller/operations/roles/createRole'
import { DeleteRoleOperator } from '@controller/operations/roles/deleteRole'
import { FindAllRolesOperator } from '@controller/operations/roles/findAllRoles'
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
  bind(CreateRoleOperator).to(CreateRoleOperator)
  bind(UpdateRoleOperator).to(UpdateRoleOperator)
  bind(DeleteRoleOperator).to(DeleteRoleOperator)
  bind(FindAllRolesOperator).to(FindAllRolesOperator)
})
