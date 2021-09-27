import { AdressModel } from '@framework/models/adresses/adressModel'
import { RoleModel } from '@framework/models/roles/roleModel'
import { UserModel } from '@framework/models/users/userModel'
import { ContainerModule, interfaces } from 'inversify'

export const modelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserModel).toConstructor(UserModel)
  bind(RoleModel).toConstructor(RoleModel)
  bind(AdressModel).toConstructor(AdressModel)
})
