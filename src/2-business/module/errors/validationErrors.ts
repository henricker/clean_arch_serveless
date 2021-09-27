import { IError } from '@shared/IError'

export const validationError = (details: unknown[]): IError =>
  new IError({
    statusCode: 400,
    body: {
      code: 'VE-001',
      shortMessage: 'validationError',
      message:
        'Your data did not pass our validaton, please, check the details property for more info',
      details,
    },
  })
