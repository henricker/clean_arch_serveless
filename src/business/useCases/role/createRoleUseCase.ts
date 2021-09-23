import {
  IInputCreateRoleDto,
  IOutputCreateRoleDto,
} from '@business/dto/role/create'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import { RoleEntity } from '@domain/entities/roleEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateRoleUseCase
  implements IAbstractUseCase<IInputCreateRoleDto, IOutputCreateRoleDto>
{
  constructor(
    @inject(IRoleRepositoryToken) private roleRepository: IRoleRepository
  ) {}
  async exec(input: IInputCreateRoleDto): Promise<IOutputCreateRoleDto> {
    const roleEntity = RoleEntity.create(input)
    try {
      const roleResult = await this.roleRepository.create(
        roleEntity.value.export()
      )

      return right(roleResult)
    } catch (error) {
      return left(RolesErrors.roleFailedToCreate())
    }
  }
}
