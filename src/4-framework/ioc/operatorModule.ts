import { CreateAuthenticationOperator } from '@root/src/3-controller/operations/authentication/createAuthentication'
import { CreateRoleOperator } from '@root/src/3-controller/operations/roles/createRole'
import { DeleteRoleOperator } from '@root/src/3-controller/operations/roles/deleteRole'
import { FindAllRolesOperator } from '@root/src/3-controller/operations/roles/findAllRoles'
import { UpdateRoleOperator } from '@root/src/3-controller/operations/roles/updateRole'
import { CreateUserOperator } from '@root/src/3-controller/operations/user/createUser'
import { RecoverPasswordOperator } from '@root/src/3-controller/operations/user/recoverPassword'
import { ShowUserOperator } from '@root/src/3-controller/operations/user/showUser'
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
