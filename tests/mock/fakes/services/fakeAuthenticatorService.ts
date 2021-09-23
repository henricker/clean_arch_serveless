import {
  IAuthenticatorService,
  ITokenVerifyFormat,
} from '@business/services/authenticator/iAuthenticator'
import { IError } from '@shared/IError'
import { injectable } from 'inversify'

@injectable()
export class FakeAuthenticatorService implements IAuthenticatorService {
  async sing(_payload: { [k: string]: string | number }): Promise<string> {
    return ''
  }
  async verify(_token: string): Promise<ITokenVerifyFormat | IError> {
    return {}
  }
}
