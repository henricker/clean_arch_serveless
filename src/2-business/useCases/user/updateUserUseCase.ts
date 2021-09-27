import {
  InputUpdateUserDto,
  OutputUpdateUserDto,
} from '@root/src/2-business/dto/user/update'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@root/src/2-business/repositories/user/iUserRepository'
import { UserEntity } from '@root/src/1-domain/entities/userEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateUserUseCase
  implements IAbstractUseCase<InputUpdateUserDto, OutputUpdateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const newUserEntity = UserEntity.update(input)

      const userUpdate = await this.userRepository.update({
        newData: newUserEntity.value.export(),
        updateWhere: {
          type: 'id',
          key: newUserEntity.value.export().id,
        },
      })

      if (!userUpdate) {
        return left(UsersErrors.userNotFound())
      }

      return right(userUpdate)
    } catch (error) {
      return left(UsersErrors.userFailedToUpdate())
    }
  }
}
