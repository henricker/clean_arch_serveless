import { inject, injectable } from 'inversify'
import type {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@root/src/2-business/dto/user/create'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@root/src/2-business/repositories/user/iUserRepository'
import { UserEntity } from '@root/src/1-domain/entities/userEntity'
import { left, right } from '@shared/either'
import {
  IHasherService,
  IHasherServiceToken,
} from '@root/src/2-business/services/hasher/iHasher'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@root/src/2-business/services/uniqueIdentifier/iUniqueIdentifier'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
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
      return left(UsersErrors.entityCreationError())
    }
  }
}
