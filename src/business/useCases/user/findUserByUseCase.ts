import type {
  InputFindUserByDto,
  OutputFindUserByDto,
} from '@business/dto/user/findBy'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindUserByUseCase
  implements AbstractUseCase<InputFindUserByDto, OutputFindUserByDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputFindUserByDto): Promise<OutputFindUserByDto> {
    const user = await this.userRepository.findBy(input.key, input.value)

    if (!user) {
      return left(UsersErrors.userNotFound())
    }

    return right(user)
  }
}
