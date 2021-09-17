import { IError } from '@shared/IError'

export const validationError = (details: unknown[]): IError =>
	new IError({
		statusCode: 400,
		body: JSON.stringify({ message: 'ValidationError', details }),
	})
