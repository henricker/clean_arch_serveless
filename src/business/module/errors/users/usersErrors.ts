import { IError } from '@shared/IError'

export class UsersErrors extends IError {
	static entityCreationError(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: { message: 'entity creating failed' },
		})
		return userErrors
	}

	static userEmailAlreadyInUse(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: { message: 'email already in use' },
		})
		return userErrors
	}
}
