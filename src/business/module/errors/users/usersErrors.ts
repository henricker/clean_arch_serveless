import { IError } from '@shared/IError'

export class UsersErrors extends IError {
	static entityCreationError(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: JSON.stringify({ message: 'entity creating failed' }),
		})
		return userErrors
	}

	static userEmailAlreadyInUse(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: JSON.stringify({ message: 'email already in use' }),
		})
		return userErrors
	}
}
