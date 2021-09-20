import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { AuthorizeUseCase } from '@business/useCases/role/authorizeUseCase'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { InputShowUser } from '@controller/serializers/user/inputShowUser'
import { IUserEntity } from '@domain/entities/userEntity'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class ShowUserOperator extends AbstractOperator<
	InputShowUser,
	Either<IError, IUserEntity>
> {
	constructor(
		@inject(AuthorizeUseCase) private authorizeUseCase: AuthorizeUseCase,
		@inject(FindUserByUseCase) private findUserByUseCase: FindUserByUseCase
	) {
		super()
	}

	async run(input: InputShowUser): Promise<Either<IError, IUserEntity>> {
		await this.exec(input)

		const allowedResult = await this.authorizeUseCase.exec({
			authorizeBy: 'id',
			key: input.current_logged_user_id,
			allowedProfiles: [],
		})

		if (allowedResult.isLeft()) {
			return left(allowedResult.value)
		}

		const currentLoggedUser = allowedResult.value

		if (currentLoggedUser.uuid === input.user_uuid) {
			delete currentLoggedUser.role
			return right(currentLoggedUser)
		}

		const user = await this.findUserByUseCase.exec({
			key: 'uuid',
			value: input.user_uuid,
		})

		if (user.isLeft()) {
			return left(UsersErrors.userNotFound())
		}

		return right(user.value)
	}
}
