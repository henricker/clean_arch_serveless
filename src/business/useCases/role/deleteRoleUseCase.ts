import { IOutputDeleteRoleDto } from '@business/dto/role/delete'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import {
  IInputDeleteRole,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import { RoleRepository } from '@framework/repositories/RoleRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeleteRoleUseCase
  implements IAbstractUseCase<IInputDeleteRole, IOutputDeleteRoleDto>
{
  constructor(
    @inject(IRoleRepositoryToken) private roleRepository: RoleRepository
  ) {}

  async exec(input: IInputDeleteRole): Promise<IOutputDeleteRoleDto> {
    const roleToDelete = await this.roleRepository.delete({
      key: input.key,
      value: input.value,
    })
    if (!roleToDelete) {
      return left(RolesErrors.roleFailedToDelete())
    }

    return right(roleToDelete)
  }
}
