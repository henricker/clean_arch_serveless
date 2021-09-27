import { RoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { fakeRoleEntity } from '@tests/mock/fakes/entities/fakeRoleEntity'

describe('Role entity', () => {
  describe('Create method', () => {
    test('Should create a role entity', () => {
      const roleResult = RoleEntity.create({ profile: 'fakeRole' })

      expect(roleResult.isLeft()).toBeFalsy()
      expect(roleResult.isRight()).toBeTruthy()
    })
  })

  describe('Update method', () => {
    test('Should update role and change update_at', () => {
      const mockDate = new Date(1632252193072)
      const fakeRole = { ...fakeRoleEntity, updated_at: mockDate }

      const updatedRole = RoleEntity.update(fakeRole)

      expect(updatedRole.isRight()).toBeTruthy()
      expect(updatedRole.value.export().updated_at).not.toBe(
        fakeRole.updated_at
      )
    })
  })
})
