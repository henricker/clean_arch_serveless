import { AuthenticationErrors } from '@business/module/errors/authentication/authenticationErrors'
import {
  IAuthenticatorService,
  ITokenVerifyFormat,
} from '@business/services/authenticator/iAuthenticator'
import { IError } from '@shared/IError'
import { injectable } from 'inversify'
import JWT from 'jsonwebtoken'

const secret = process.env.SECRET

if (!secret) {
  throw new Error('No secret provided in .env')
}

@injectable()
export class AuthenticatorService implements IAuthenticatorService {
  async sing(payload: { [k: string]: string | number }): Promise<string> {
    const token = JWT.sign(payload, secret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    })

    return token
  }

  async verify(token: string): Promise<ITokenVerifyFormat | IError> {
    try {
      const tokenPayload = JWT.verify(token, secret) as ITokenVerifyFormat

      return tokenPayload
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError) {
        return AuthenticationErrors.tokenExpired()
      }

      return AuthenticationErrors.tokenError()
    }
  }
}
