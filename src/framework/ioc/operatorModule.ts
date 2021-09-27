import { CreateAdressOperator } from '@controller/operations/adress/create'
import { DeleteAdressOperator } from '@controller/operations/adress/delete'
import { UpdateAdressOperator } from '@controller/operations/adress/update'
import { CreateAuthenticationOperator } from '@controller/operations/authentication/createAuthentication'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { RecoverPasswordOperator } from '@controller/operations/user/recoverPassword'
import { ShowUserOperator } from '@controller/operations/user/showUser'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
  bind(CreateAuthenticationOperator).to(CreateAuthenticationOperator)
  bind(ShowUserOperator).to(ShowUserOperator)
  bind(RecoverPasswordOperator).to(RecoverPasswordOperator)
  bind(CreateAdressOperator).to(CreateAdressOperator)
  bind(UpdateAdressOperator).to(UpdateAdressOperator)
  bind(DeleteAdressOperator).to(DeleteAdressOperator)
})
