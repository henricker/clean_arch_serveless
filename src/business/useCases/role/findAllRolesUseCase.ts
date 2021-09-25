import { IOutputFindAllRoles } from '@business/dto/role/findAll'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import {
  IInputFindAllRole,
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindAllRolesUseCase
  implements IAbstractUseCase<IInputFindAllRole, IOutputFindAllRoles>
{
  constructor(
    @inject(IRoleRepositoryToken) private roleRepository: IRoleRepository
  ) {}
  async exec(input: IInputFindAllRole): Promise<IOutputFindAllRoles> {
    const roles = await this.roleRepository.findAll(input)

    if (!roles) {
      return left(RolesErrors.rolesFailedToLoad())
    }

    return right(roles)
  }
}
