import { RoleModel } from '@root/src/4-framework/models/roles/roleModel'
import { UserModel } from '@root/src/4-framework/models/users/userModel'
import { ContainerModule, interfaces } from 'inversify'

export const modelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(UserModel).toConstructor(UserModel)
  bind(RoleModel).toConstructor(RoleModel)
})
