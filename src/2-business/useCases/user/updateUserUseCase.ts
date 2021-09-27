import {
  InputUpdateUserDto,
  IOutputUpdateUserDto,
} from '@business/dto/user/update'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IWhere } from '@business/repositories/where'
import {
  IUserRepository,
  IUserRepositoryToken,
  UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import {
  IHasherService,
  IHasherServiceToken,
} from '@business/services/hasher/iHasher'
import { UserEntity } from '@domain/entities/userEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateUserUseCase
  implements IAbstractUseCase<InputUpdateUserDto, IOutputUpdateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IHasherServiceToken) private hasherService: IHasherService
  ) {}

  async exec(
    input: InputUpdateUserDto,
    updateWhere: IWhere<UserEntityKeys, string | number>
  ): Promise<IOutputUpdateUserDto> {
    try {
      const newUserEntity = UserEntity.update(input)

      const user = newUserEntity.value.export()

      const userPassword = user.password
        ? await this.hasherService.create(user.password)
        : undefined

      const userUpdate = await this.userRepository.update({
        newData: {
          email: user.email,
          role_id: user.role_id,
          full_name: user.full_name,
          password: userPassword,
          forgot_password_token: user.forgot_password_token,
          forgot_password_token_expires_in:
            user.forgot_password_token_expires_in,
          updated_at: user.updated_at,
        },
        updateWhere,
      })

      if (!userUpdate) {
        return left(UsersErrors.userNotFound())
      }

      return right(newUserEntity.value.export())
    } catch (error) {
      return left(UsersErrors.userFailedToUpdate())
    }
  }
}
