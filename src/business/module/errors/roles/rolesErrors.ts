import { IError } from '@shared/IError'

export class RolesErrors extends IError {
  static roleNotFound(): IError {
    const roleError = new RolesErrors({
      statusCode: 404,
      body: {
        code: 'RE-001',
        message: 'The role acess that you were searching was not found',
        shortMessage: 'roleNotFound',
      },
    })

    return roleError
  }
  static roleNotAllowed(): IError {
    const roleError = new RolesErrors({
      statusCode: 401,
      body: {
        code: 'RE-002',
        message: 'Your role does not have acess to this functionality',
        shortMessage: 'roleNotAllowed',
      },
    })

    return roleError
  }
}
