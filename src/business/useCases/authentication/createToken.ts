import type {
  IInputAuthenticateUseCase,
  IOutputAuthenticateUseCase,
} from '@business/dto/authentication/authenticate'
import { AuthenticationErrors } from '@business/module/errors/authentication/authenticationErrors'
import {
  IAuthenticatorService,
  IAuthenticatorServiceToken,
} from '@business/services/authenticator/iAuthenticator'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateTokenUseCase
  implements
    IAbstractUseCase<IInputAuthenticateUseCase, IOutputAuthenticateUseCase>
{
  constructor(
    @inject(IAuthenticatorServiceToken)
    private authenticatorService: IAuthenticatorService
  ) {}

  async exec(
    input: IInputAuthenticateUseCase
  ): Promise<IOutputAuthenticateUseCase> {
    try {
      const token = await this.authenticatorService.sing(input.payload)

      return right({ token })
    } catch (error) {
      return left(AuthenticationErrors.tokenCreationFailed())
    }
  }
}
