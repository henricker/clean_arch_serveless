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
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { fakeUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'

describe('User use cases', () => {
	const fakeNewUser: InputCreateUserDto = {
		email: 'fake@email',
		full_name: 'fake full name',
		password: 'fake_password',
		role_id: 0,
	}

	beforeAll(() => {
		container.bind(CreateUserUseCase).to(CreateUserUseCase)
		container.bind(FindUserByUseCase).to(FindUserByUseCase)
		container.bind(IHasherServiceToken).to(FakeHasherService)
		container.bind(IUserRepositoryToken).to(FakeUserRepository)
		container
			.bind(IUniqueIdentifierServiceToken)
			.to(FakeUniqueIdentifierService)
	})

	afterAll(() => {
		container.unbindAll()
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
		test('Should return user if it exists', async () => {
			const userRepository = container.get(FindUserByUseCase)

			const userResult = await userRepository.exec({
				key: 'email',
				value: fakeUserEntity.email,
			})

			expect(userResult.isLeft()).toBeFalsy()
			expect(userResult.isRight()).toBeTruthy()
		})

		test('Should not find user if it does not exists', async () => {
			const userRepository = container.get(FindUserByUseCase)

			const userResult = await userRepository.exec({
				key: 'email',
				value: 'nonexistent@email.com',
			})

			expect(userResult.isLeft()).toBeTruthy()
			expect(userResult.isRight()).toBeFalsy()
		})
	})
})
