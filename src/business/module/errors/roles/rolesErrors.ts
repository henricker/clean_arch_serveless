import { IError } from '@shared/IError'

export class RolesErrors extends IError {
	static roleNotFound(): IError {
		const roleError = new RolesErrors({
			statusCode: 404,
			body: JSON.stringify({
				message: 'The role acess that you were searching was not found',
			}),
		})

		return roleError
	}
}
