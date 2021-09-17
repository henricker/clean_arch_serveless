// Make sure that container is first called, reflect-metada is important for decorators which are used in subsequent imports
import { container } from '@shared/ioc/container'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IHasherServiceToken } from '@business/services/hasher/iHasher'
import { FakeUserRepository } from '@tests/mock/fakes/repositories/fakeUserRepository'
import { FakeHasherService } from '@tests/mock/fakes/services/fakeHasherService'
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { FakeUniqueIdentifierService } from '@tests/mock/fakes/services/fakeUniqueIdentifierService'
import { InputCreateUserDto } from '@business/dto/user/create'

describe('User use cases', () => {
	const fakeNewUser: InputCreateUserDto = {
		email: 'fake@email',
		full_name: 'fake full name',
		password: 'fake_password',
		role_id: 0,
	}

	beforeAll(() => {
		container.bind(CreateUserUseCase).to(CreateUserUseCase)
		container.bind(IHasherServiceToken).to(FakeHasherService)
		container.bind(IUserRepositoryToken).to(FakeUserRepository)
		container
			.bind(IUniqueIdentifierServiceToken)
			.to(FakeUniqueIdentifierService)
	})

	describe('CreateUser', () => {
		test('Should create an user', async () => {
			const operator = container.get(CreateUserUseCase)

			const userEntity = await operator.exec(fakeNewUser)

			expect(userEntity.isLeft()).toBeFalsy()
			expect(userEntity.isRight()).toBeTruthy()

			if (userEntity.isRight()) {
				expect(userEntity.value.email).toBe(fakeNewUser.email)
				expect(userEntity.value.full_name).toBe(fakeNewUser.full_name)
			}

			expect.assertions(4)
		})
	})

	describe('FindUserBy', () => {
		test('Should not find user if it does not exists', async () => {
			const userRepository =
				container.get<FakeUserRepository>(IUserRepositoryToken)

			const user = await userRepository.findBy('id', fakeNewUser.email)

			if (!user) {
				expect(user).toBeFalsy()
			}

			expect.assertions(1)
		})
	})
})
