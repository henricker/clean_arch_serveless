import { inject, injectable } from 'inversify'
import type {
	InputCreateUserDto,
	OutputCreateUserDto,
} from '@business/dto/user/create'
import { AbstractUseCase } from '../abstractUseCase'
import {
	IUserRepository,
	IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { UserEntity } from '@domain/entities/userEntity'
import { left, right } from '@shared/either'
import {
	IHasherService,
	IHasherServiceToken,
} from '@business/services/hasher/iHasher'
import {
	IUniqueIdentifierService,
	IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { UsersErrors } from '@business/module/errors/users/usersErrors'

@injectable()
export class CreateUserUseCase
	implements AbstractUseCase<InputCreateUserDto, OutputCreateUserDto>
{
	constructor(
		@inject(IUserRepositoryToken) private userRepository: IUserRepository,
		@inject(IHasherServiceToken) private hasherService: IHasherService,
		@inject(IUniqueIdentifierServiceToken)
		private uniqueIdentifierService: IUniqueIdentifierService
	) {}

	async exec(props: InputCreateUserDto): Promise<OutputCreateUserDto> {
		const hashPassword = await this.hasherService.create(props.password)

		const createUser = UserEntity.create({
			...props,
			password: hashPassword,
		})

		try {
			const userEntity = await this.userRepository.create(
				{
					uuid: this.uniqueIdentifierService.create(),
					...createUser.value.export(),
				},
				props.role_id
			)

			return right(userEntity)
		} catch (error) {
			console.error(error)
			return left(UsersErrors.entityCreationError())
		}
	}
}
