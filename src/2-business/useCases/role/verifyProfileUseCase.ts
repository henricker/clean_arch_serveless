import {
  IInputAuthorizeUseCase,
  IOutputAuthorizeUseCase,
} from '@root/src/2-business/dto/role/authorize'
import { RolesErrors } from '@root/src/2-business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@root/src/2-business/repositories/user/iUserRepository'
import { IUserEntity } from '@root/src/1-domain/entities/userEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class VerifyProfileUseCase
  implements IAbstractUseCase<IInputAuthorizeUseCase, IOutputAuthorizeUseCase>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: IInputAuthorizeUseCase): Promise<IOutputAuthorizeUseCase> {
    const user = (await this.userRepository.findBy(
      input.authorizeBy,
      input.key,
      [
        {
          tableName: 'role',
          currentTableColumn: 'role_id',
          foreignJoinColumn: 'roles.id',
        },
      ]
    )) as Required<IUserEntity>

    if (!user) {
      return left(UsersErrors.userNotFound())
    }

    if (!user.role) {
      return left(UsersErrors.userNotLoadedCorrectly())
    }

    const allowedProfiles = [...input.allowedProfiles, 'admin']

    if (!allowedProfiles.includes(user.role.profile)) {
      const lastChance = input.lastChance ? await input.lastChance(user) : false

      return lastChance ? right(user) : left(RolesErrors.roleNotAllowed())
    }

    return right(user)
  }
}
