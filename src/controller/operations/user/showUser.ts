import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { InputShowUser } from '@controller/serializers/user/inputShowUser'
import { IUserEntity } from '@domain/entities/userEntity'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class ShowUserOperator extends AbstractOperator<
  InputShowUser,
  Either<IError, IUserEntity>
> {
  constructor(
    @inject(VerifyProfileUseCase)
    private verifyProfileUseCase: VerifyProfileUseCase,
    @inject(FindUserByUseCase) private findUserByUseCase: FindUserByUseCase
  ) {
    super()
  }

  async run(
    input: InputShowUser,
    user_id: number
  ): Promise<Either<IError, IUserEntity>> {
    await this.exec(input)

    const allowedResult = await this.verifyProfileUseCase.exec({
      authorizeBy: 'id',
      key: user_id,
      allowedProfiles: [],
      lastChance: async (user) => user.id === user_id,
    })

    if (allowedResult.isLeft()) {
      return left(allowedResult.value)
    }

    const currentLoggedUser = allowedResult.value

    if (currentLoggedUser.uuid === input.user_uuid) {
      return right(currentLoggedUser)
    }

    const user = await this.findUserByUseCase.exec({
      key: 'uuid',
      value: input.user_uuid,
    })

    if (user.isLeft()) {
      return left(UsersErrors.userNotFound())
    }

    Object.defineProperty(user.value, 'id', {
      enumerable: false,
    })

    return right(user.value)
  }
}
