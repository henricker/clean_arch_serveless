import {
  InputUpdateUserDto,
  OutputUpdateUserDto,
} from '@business/dto/user/update'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateUserUseCase
  implements AbstractUseCase<InputUpdateUserDto, OutputUpdateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const userUpdate = await this.userRepository.update(input)

      if (!userUpdate) {
        return left(UsersErrors.userNotFound())
      }

      return right(userUpdate)
    } catch (error) {
      return left(UsersErrors.userFailedToUpdate())
    }
  }
}
