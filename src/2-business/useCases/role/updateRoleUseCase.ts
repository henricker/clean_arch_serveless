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
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateRoleUseCase
  implements IAbstractUseCase<InputUpdateRoleDto, OutputUpdateRoleDto>
{
  constructor(
    @inject(IRoleRepositoryToken) private roleRepository: IRoleRepository
  ) {}
  async exec(input: InputUpdateRoleDto): Promise<OutputUpdateRoleDto> {
    try {
      const newRoleEntity = RoleEntity.update(input)

      const roleUpdated = await this.roleRepository.update({
        newData: newRoleEntity.value.export(),
        updateWhere: {
          type: 'id',
          key: newRoleEntity.value.export().id,
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
