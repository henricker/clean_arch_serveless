import {
	InputAuthorizeUseCase,
	OutputAuthorizeUseCase,
} from '@business/dto/role/authorize'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import {
	IUserRepository,
	IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/userEntity'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class AuthorizeUseCase
	implements AbstractUseCase<InputAuthorizeUseCase, OutputAuthorizeUseCase>
{
	constructor(
		@inject(IUserRepositoryToken) private userRepository: IUserRepository
	) {}

	async exec(input: InputAuthorizeUseCase): Promise<OutputAuthorizeUseCase> {
		const user = (await this.userRepository.findBy(
			input.authorizeBy,
			input.key,
			['role']
		)) as Required<IUserEntity>

		if (!user) {
			return left(UsersErrors.userNotFound())
		}

		if (!user.role) {
			return left(UsersErrors.userNotLoadedCorrectly())
		}

		const allowedProfiles = [...input.allowedProfiles, 'admin']

		if (!allowedProfiles.includes(user.role.profile)) {
			return left(RolesErrors.roleNotAllowed())
		}

		return right(user)
	}
}
