import { IError } from '@shared/IError'

export class AuthenticationErrors extends IError {
  static invalidCredentials(): IError {
    const authenticationError = new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-001',
        message: 'Email or password wrong',
        shortMessage: 'wrongCredentials',
      },
    })

    return authenticationError
  }

  static tokenCreationError(): IError {
    const authenticationError = new AuthenticationErrors({
      statusCode: 500,
      body: {
        code: 'AE-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
    })

    return authenticationError
  }
}
