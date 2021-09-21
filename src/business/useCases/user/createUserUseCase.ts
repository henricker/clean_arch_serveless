import { inject, injectable } from 'inversify'
import type {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@business/dto/user/create'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { UserEntity } from '@domain/entities/userEntity'
import { left, right } from '@shared/either'
import {
  IHasherService,
  IHasherServiceToken,
} from '@business/services/hasher/iHasher'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateUserUseCase
  implements AbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IHasherServiceToken) private hasherService: IHasherService,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifierService: IUniqueIdentifierService
  ) {}

  async exec(input: IInputCreateUserDto): Promise<IOutputCreateUserDto> {
    const hashPassword = await this.hasherService.create(input.password)

    const createUser = UserEntity.create({
      ...input,
      password: hashPassword,
    })

    try {
      const userEntity = await this.userRepository.create(
        {
          ...createUser.value.export(),
          uuid: this.uniqueIdentifierService.create(),
        },
        input.role_id
      )

      return right(userEntity)
    } catch (error) {
      console.error(error)
      return left(UsersErrors.entityCreationError())
    }
  }
}
