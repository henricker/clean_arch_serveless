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
}
