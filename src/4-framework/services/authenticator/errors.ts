import { IError } from '@shared/IError'

export class AuthErrors extends IError {
  static tokenError(): IError {
    const authenticationError = new AuthErrors({
      statusCode: 401,
      body: {
        code: 'AE-003',
        message: 'Invalid token',
        shortMessage: 'invalidToken',
      },
    })

    return authenticationError
  }

  static tokenExpired(): IError {
    const authenticationError = new AuthErrors({
      statusCode: 401,
      body: {
        code: 'AE-004',
        message: 'Token expired',
        shortMessage: 'expiredToken',
      },
    })

    return authenticationError
  }
}
