import { UserEntity } from '@domain/entities/userEntity'
import { fakeCreatedUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'

describe('User entity', () => {
  describe('Create method', () => {
    test('Should create a user entity', () => {
      const user = UserEntity.create(fakeCreatedUserEntity)

      expect(user.isLeft()).toBeFalsy()
      expect(user.isRight()).toBeTruthy()
    })
  })
})
