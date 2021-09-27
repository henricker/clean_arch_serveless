import { IError } from '@shared/IError'

export class AdressesError extends IError {
  static adressFailedToCreate(): IError {
    const adressError = new AdressesError({
      statusCode: 500,
      body: {
        code: 'ARE-001',
        message: 'Adress failed to create',
        shortMessage: 'adressFailedToCreate',
      },
    })

    return adressError
  }
  static adressFailedUpdate(): IError {
    const adressError = new AdressesError({
      statusCode: 500,
      body: {
        code: 'ARE-002',
        message: 'Adress failed to update',
        shortMessage: 'adressFailedUpdate',
      },
    })

    return adressError
  }
  static adressFailedDelete(): IError {
    const adressError = new AdressesError({
      statusCode: 500,
      body: {
        code: 'ARE-003',
        message: 'Adress failed to delete',
        shortMessage: 'adressFailedDelete',
      },
    })

    return adressError
  }
}
