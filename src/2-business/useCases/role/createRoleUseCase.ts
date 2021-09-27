import {
  IInputCreateRoleDto,
  IOutputCreateRoleDto,
} from '@root/src/2-business/dto/role/create'
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
