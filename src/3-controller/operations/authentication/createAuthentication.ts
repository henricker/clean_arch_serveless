import type { IOutputAuthenticateUseCase } from '@root/src/2-business/dto/authentication/authenticate'
import { AuthenticationErrors } from '@root/src/2-business/module/errors/authentication/authenticationErrors'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import {
  IHasherService,
  IHasherServiceToken,
} from '@root/src/2-business/services/hasher/iHasher'
import { CreateTokenUseCase } from '@root/src/2-business/useCases/authentication/createToken'
import { FindUserByUseCase } from '@root/src/2-business/useCases/user/findUserByUseCase'
import { InputCreateAuthentication } from '@root/src/3-controller/serializers/authenticator/inputCreateAuthetication'
import { ITokenPayload } from '@root/src/4-framework/utility/types'
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
      return left(tokenResult.value)
    }

    return right(tokenResult.value)
  }
}
