import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { AuthorizeUseCase } from '@business/useCases/role/authorizeUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { container } from '@shared/ioc/container'
import { fakeCreatedUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import { FakeRoleRepository } from '@tests/mock/fakes/repositories/fakeRoleRepository'
import { FakeUserRepository } from '@tests/mock/fakes/repositories/fakeUserRepository'

describe('Roles use case', () => {
	beforeAll(() => {
		container.bind(FindRoleByUseCase).to(FindRoleByUseCase)
		container.bind(AuthorizeUseCase).to(AuthorizeUseCase)
		container.bind(IUserRepositoryToken).to(FakeUserRepository)
		container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
	})

	afterAll(() => {
		container.unbindAll()
	})

	describe('Find role by use case', () => {
		test('Should find a existent role', async () => {
			const operator = container.get(FindRoleByUseCase)

			const roleResult = await operator.exec({ key: 'profile', value: 'admin' })

			expect(roleResult.isLeft()).toBeFalsy()
			expect(roleResult.isRight()).toBeTruthy()
		})

		test('Should not find a unexistent role', async () => {
			const operator = container.get(FindRoleByUseCase)

			const roleResult = await operator.exec({
				key: 'profile',
				value: 'intern',
			})

			expect(roleResult.isLeft()).toBeTruthy()
			expect(roleResult.isRight()).toBeFalsy()
		})
	})

	describe('Authorize use case', () => {
		test('Should authorize user', async () => {
			const operator = container.get(AuthorizeUseCase)

			const userAuthorizerResult = await operator.exec({
				allowedProfiles: ['manager'],
				authorizeBy: 'email',
				key: fakeCreatedUserEntity.email,
			})

			expect(userAuthorizerResult.isLeft()).toBeFalsy()
			expect(userAuthorizerResult.isRight()).toBeTruthy()
		})

		test('Should not authorize user', async () => {
			const operator = container.get(AuthorizeUseCase)

			const userAuthorizerResult = await operator.exec({
				allowedProfiles: ['manager'],
				authorizeBy: 'email',
				key: fakeCreatedUserEntity.email + '.br',
			})

			expect(userAuthorizerResult.isLeft()).toBeTruthy()
			expect(userAuthorizerResult.isRight()).toBeFalsy()
		})

		test('Should not authorize user with unsuficient permissions', async () => {
			const operator = container.get(AuthorizeUseCase)

			const userAuthorizerResult = await operator.exec({
				allowedProfiles: [],
				authorizeBy: 'email',
				key: fakeCreatedUserEntity.email + '.br',
			})

			expect(userAuthorizerResult.isLeft()).toBeTruthy()
			expect(userAuthorizerResult.isRight()).toBeFalsy()
		})
	})
})
