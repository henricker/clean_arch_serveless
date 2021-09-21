import type {
  IInputAuthenticateUseCase,
  IOutputAuthenticateUseCase,
} from '@business/dto/authentication/authenticate'
import {
  IAuthenticatorService,
  IAuthenticatorServiceToken,
} from '@business/services/authenticator/iAuthenticator'
import { right } from '@shared/either'
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
    const token = await this.authenticatorService.sing(input.payload)

    return right({ token })
  }
}
