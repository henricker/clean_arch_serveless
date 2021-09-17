import { UserEntity } from '@domain/entities/userEntity'
import { fakeUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'

describe('User entity', () => {
	describe('Create method', () => {
		test('Should create a user entity', () => {
			const user = UserEntity.create(fakeUserEntity)

			expect(user.isLeft()).toBeFalsy()
			expect(user.isRight()).toBeTruthy()
		})
	})
})
