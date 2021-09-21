import type { IOutputAuthenticateUseCase } from '@business/dto/authentication/authenticate'
import { AuthenticationErrors } from '@business/module/errors/authentication/authenticationErrors'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import {
  IHasherService,
  IHasherServiceToken,
} from '@business/services/hasher/iHasher'
import { CreateTokenUseCase } from '@business/useCases/authentication/createToken'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { InputCreateAuthentication } from '@controller/serializers/authenticator/inputCreateAuthetication'
import { ITokenPayload } from '@framework/utility/types'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateAuthenticationOperator extends AbstractOperator<
  InputCreateAuthentication,
  IOutputAuthenticateUseCase
> {
  constructor(
    @inject(FindUserByUseCase) private findUserByUseCase: FindUserByUseCase,
    @inject(CreateTokenUseCase)
    private createTokenUseCase: CreateTokenUseCase,
    @inject(IHasherServiceToken) private hasherService: IHasherService
  ) {
    super()
  }

  async run(
    input: InputCreateAuthentication
  ): Promise<IOutputAuthenticateUseCase> {
    await this.exec(input)

    const userResult = await this.findUserByUseCase.exec({
      key: 'email',
      value: input.email,
    })

    if (userResult.isLeft()) {
      return left(UsersErrors.userNotFound())
    }

    const isPasswordCorrectResult = await this.hasherService.compare(
      input.password,
      userResult.value.password
    )

    if (!isPasswordCorrectResult) {
      return left(AuthenticationErrors.invalidCredentials())
    }

    const tokenPayload: ITokenPayload = {
      user_id: userResult.value.id,
      user_uuid: userResult.value.uuid,
    }

    const tokenResult = await this.createTokenUseCase.exec({
      payload: tokenPayload,
    })

    if (tokenResult.isLeft()) {
      return left(AuthenticationErrors.tokenCreationError())
    }

    return right(tokenResult.value)
  }
}
