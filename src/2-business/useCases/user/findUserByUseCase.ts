import type {
  IInputFindUserByDto,
  IOutputFindUserByDto,
} from '@root/src/2-business/dto/user/findBy'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@root/src/2-business/repositories/user/iUserRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindUserByUseCase
  implements IAbstractUseCase<IInputFindUserByDto, IOutputFindUserByDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: IInputFindUserByDto): Promise<IOutputFindUserByDto> {
    const user = await this.userRepository.findBy(input.key, input.value)

    if (!user) {
      return left(UsersErrors.userNotFound())
    }

    return right(user)
  }
}
