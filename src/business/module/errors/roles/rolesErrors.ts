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
      statusCode: 403,
      body: {
        code: 'RE-002',
        message: 'Your role does not have acess to this functionality',
        shortMessage: 'roleNotAllowed',
      },
    })

    return roleError
  }

  static roleFailedToUpdate(): IError {
    const roleError = new RolesErrors({
      statusCode: 500,
      body: {
        code: 'RE-003',
        message: 'Role could not be updated',
        shortMessage: 'roleNotUpdated',
      },
    })

    return roleError
  }

  static roleFailedToCreate(): IError {
    const roleError = new RolesErrors({
      statusCode: 500,
      body: {
        code: 'RE-004',
        message: 'Role could not be created',
        shortMessage: 'roleNotCreated',
      },
    })

    return roleError
  }

  static roleAlreadyExists(): IError {
    const roleError = new RolesErrors({
      statusCode: 400,
      body: {
        code: 'RE-005',
        message: 'Role already exists',
        shortMessage: 'roleAlreadyExists',
      },
    })

    return roleError
  }

  static roleFailedToDelete(): IError {
    const roleError = new RolesErrors({
      statusCode: 500,
      body: {
        code: 'RE-006',
        message: 'Role could not be deleted',
        shortMessage: 'roleNotDeleted',
      },
    })

    return roleError
  }

  static rolesFailedToLoad(): IError {
    const roleError = new RolesErrors({
      statusCode: 500,
      body: {
        code: 'RE-007',
        message: 'Roles could not be load',
        shortMessage: 'rolesNotLoaded',
      },
    })

    return roleError
  }
}
