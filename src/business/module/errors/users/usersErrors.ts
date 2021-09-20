import { IError } from '@shared/IError'

export class UsersErrors extends IError {
	static entityCreationError(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: {
				code: 'UE-001',
				message:
					'Error during creation of the user entity, please try again later',
				shortMessage: 'entityCreationFailed',
			},
		})
		return userErrors
	}

	static userEmailAlreadyInUse(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: {
				code: 'UE-002',
				message: 'This e-mail is already in use, please use another',
				shortMessage: 'entityCreationFailed',
			},
		})
		return userErrors
	}

	static userNotFound(): IError {
		const userErrors = new UsersErrors({
			statusCode: 404,
			body: {
				code: 'UE-003',
				message: 'User not found',
				shortMessage: 'useNotFound',
			},
		})
		return userErrors
	}

	static userNotLoadedCorrectly(): IError {
		const userErrors = new UsersErrors({
			statusCode: 400,
			body: {
				code: 'UE-004',
				message: 'User entity not loaded as espected',
				shortMessage: 'userNotLoadedCorrectly',
			},
		})
		return userErrors
	}
}
