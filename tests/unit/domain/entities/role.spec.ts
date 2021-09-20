import { RoleEntity } from '@domain/entities/roleEntity'

describe('Role entity', () => {
	describe('Create method', () => {
		test('Should create a role entity', () => {
			const roleResult = RoleEntity.create({ profile: 'fakeRole' })

			expect(roleResult.isLeft()).toBeFalsy()
			expect(roleResult.isRight()).toBeTruthy()
		})
	})
})
