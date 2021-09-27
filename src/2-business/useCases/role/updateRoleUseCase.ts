import {
  InputUpdateRoleDto,
  OutputUpdateRoleDto,
} from '@root/src/2-business/dto/role/update'
import { RolesErrors } from '@root/src/2-business/module/errors/roles/rolesErrors'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@root/src/2-business/repositories/role/iRoleRepository'
import { RoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IWhere } from '@business/repositories/where'
import { RoleEntityKeys } from '@business/dto/role/findBy'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateRoleUseCase
  implements IAbstractUseCase<InputUpdateRoleDto, OutputUpdateRoleDto>
{
  constructor(
    @inject(IRoleRepositoryToken) private roleRepository: IRoleRepository
  ) {}
  async exec(
    input: InputUpdateRoleDto,
    updateWhere: IWhere<RoleEntityKeys, string | number>
  ): Promise<OutputUpdateRoleDto> {
    try {
      const newRoleEntity = RoleEntity.update(input)

      const roleUpdated = await this.roleRepository.update({
        newData: newRoleEntity.value.export(),
        updateWhere: {
          column: updateWhere.column,
          value: updateWhere.value,
        },
      })

      if (!roleUpdated) {
        return left(RolesErrors.roleNotFound())
      }

      return right(roleUpdated)
    } catch (error) {
      return left(RolesErrors.roleFailedToUpdate())
    }
  }
}
