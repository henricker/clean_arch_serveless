import { container } from '@shared/ioc/container'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IHasherServiceToken } from '@business/services/hasher/iHasher'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
import { FakeUserRepository } from '@tests/mock/fakes/repositories/fakeUserRepository'
import { FakeHasherService } from '@tests/mock/fakes/services/fakeHasherService'
import { FakeUniqueIdentifierService } from '@tests/mock/fakes/services/fakeUniqueIdentifierService'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { FakeRoleRepository } from '@tests/mock/fakes/repositories/fakeRoleRepository'
import { IError } from '@shared/IError'

describe('Create user operator', () => {
	beforeAll(() => {
		container.bind(IHasherServiceToken).to(FakeHasherService)
		container.bind(IUserRepositoryToken).to(FakeUserRepository)
		container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
		container
			.bind(IUniqueIdentifierServiceToken)
			.to(FakeUniqueIdentifierService)
		container.bind(CreateUserUseCase).to(CreateUserUseCase)
		container.bind(FindUserByUseCase).to(FindUserByUseCase)
		container.bind(FindRoleByUseCase).to(FindRoleByUseCase)
		container.bind(CreateUserOperator).to(CreateUserOperator)
	})

	afterAll(() => {
		container.unbindAll()
	})

	test('Should create a user', async () => {
		const inputCreateUser = new InputCreateUser({
			email: 'fake@mail.com',
			full_name: 'Fake Full_Name',
			password: 'test_12345',
		})

		const operator = container.get(CreateUserOperator)

		const user = await operator.run(inputCreateUser)

		expect(user.isLeft()).toBeFalsy()
		expect(user.isRight()).toBeTruthy()
	})

	test('Should not create a user with invalid email', async () => {
		const inputCreateUser = new InputCreateUser({
			email: 'fakemail.com',
			full_name: 'Fake Full_Name',
			password: 'test_12345',
		})

		try {
			const operator = container.get(CreateUserOperator)
			await operator.run(inputCreateUser)
		} catch (error) {
			expect(error).toBeInstanceOf(IError)
		}
		expect.assertions(1)
	})

	test('Should not create a user with invalid name', async () => {
		const inputCreateUser = new InputCreateUser({
			email: 'fakemail.com',
			full_name: 'F',
			password: 'test_12345',
		})

		try {
			const operator = container.get(CreateUserOperator)
			await operator.run(inputCreateUser)
		} catch (error) {
			expect(error).toBeInstanceOf(IError)
		}
		expect.assertions(1)
	})

	test('Should not create a user with invalid password', async () => {
		const inputCreateUser = new InputCreateUser({
			email: 'fakemail.com',
			full_name: 'Fake Full_Name',
			password: '12345',
		})

		try {
			const operator = container.get(CreateUserOperator)
			await operator.run(inputCreateUser)
		} catch (error) {
			expect(error).toBeInstanceOf(IError)
		}
		expect.assertions(1)
	})
})
