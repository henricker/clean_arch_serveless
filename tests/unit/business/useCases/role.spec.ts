import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { container } from '@shared/ioc/container'
import { fakeRoleEntity } from '@tests/mock/fakes/entities/fakeRoleEntity'
import {
  fakeCreatedUserEntity,
  fakeUserEntity,
} from '@tests/mock/fakes/entities/fakeUserEntity'
import {
  FakeRoleRepository,
  fakeRoleRepositoryCreate,
  fakeRoleRepositoryDelete,
  fakeRoleRepositoryFindBy,
  fakeRoleRepositoryUpdate,
} from '@tests/mock/fakes/repositories/fakeRoleRepository'
import {
  FakeUserRepository,
  fakeUserRepositoryFindBy,
} from '@tests/mock/fakes/repositories/fakeUserRepository'
import { UpdateRoleUseCase } from '@business/useCases/role/updateRoleUseCase'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { CreateRoleUseCase } from '@business/useCases/role/createRoleUseCase'
import { DeleteRoleUseCase } from '@business/useCases/role/deleteRoleUseCase'

describe('Roles use case', () => {
  beforeAll(() => {
    container.bind(FindRoleByUseCase).to(FindRoleByUseCase)
    container.bind(VerifyProfileUseCase).to(VerifyProfileUseCase)
    container.bind(CreateRoleUseCase).to(CreateRoleUseCase)
    container.bind(UpdateRoleUseCase).to(UpdateRoleUseCase)
    container.bind(DeleteRoleUseCase).to(DeleteRoleUseCase)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Find role by use case', () => {
    test('Should find a existent role', async () => {
      const operator = container.get(FindRoleByUseCase)

      fakeRoleRepositoryFindBy.mockImplementation(async () => fakeRoleEntity)

      const roleResult = await operator.exec({ key: 'profile', value: 'admin' })

      expect(roleResult.isLeft()).toBeFalsy()
      expect(roleResult.isRight()).toBeTruthy()
    })

    test('Should not find a unexistent role', async () => {
      const operator = container.get(FindRoleByUseCase)

      fakeRoleRepositoryFindBy.mockImplementation(() => void 0)

      const roleResult = await operator.exec({
        key: 'profile',
        value: 'intern',
      })

      expect(roleResult.isLeft()).toBeTruthy()
      expect(roleResult.isRight()).toBeFalsy()
    })
  })

  describe('Authorize use case', () => {
    test('Should not find user', async () => {
      const operator = container.get(VerifyProfileUseCase)

      fakeUserRepositoryFindBy.mockImplementation(() => void 0)

      const userAuthorizerResult = await operator.exec({
        allowedProfiles: ['manager'],
        authorizeBy: 'email',
        key: fakeCreatedUserEntity.email,
      })

      expect(userAuthorizerResult.isLeft()).toBeTruthy()
      expect(userAuthorizerResult.isRight()).toBeFalsy()

      if (userAuthorizerResult.isLeft()) {
        expect(userAuthorizerResult.value.statusCode).toBe(
          UsersErrors.userNotFound().statusCode
        )
      }

      expect.assertions(3)
    })

    test('Should throw if user not loaded correctly', async () => {
      const operator = container.get(VerifyProfileUseCase)

      fakeUserRepositoryFindBy.mockImplementation(async () => ({
        ...fakeUserEntity,
        role: undefined,
      }))

      const userAuthorizerResult = await operator.exec({
        allowedProfiles: ['manager'],
        authorizeBy: 'email',
        key: fakeCreatedUserEntity.email,
      })

      expect(userAuthorizerResult.isLeft()).toBeTruthy()
      expect(userAuthorizerResult.isRight()).toBeFalsy()

      if (userAuthorizerResult.isLeft()) {
        expect(userAuthorizerResult.value.statusCode).toBe(
          UsersErrors.userNotLoadedCorrectly().statusCode
        )
      }

      expect.assertions(3)
    })
    test('Should authorize user', async () => {
      const operator = container.get(VerifyProfileUseCase)

      fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

      const userAuthorizerResult = await operator.exec({
        allowedProfiles: ['manager'],
        authorizeBy: 'email',
        key: fakeCreatedUserEntity.email,
      })

      expect(userAuthorizerResult.isLeft()).toBeFalsy()
      expect(userAuthorizerResult.isRight()).toBeTruthy()
    })

    test('Should not authorize user', async () => {
      const operator = container.get(VerifyProfileUseCase)

      fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

      const userAuthorizerResult = await operator.exec({
        allowedProfiles: [],
        authorizeBy: 'email',
        key: `${fakeCreatedUserEntity.email}.br`,
      })

      expect(userAuthorizerResult.isLeft()).toBeTruthy()
      expect(userAuthorizerResult.isRight()).toBeFalsy()
    })

    test('Should not authorize user with unsuficient permissions', async () => {
      const operator = container.get(VerifyProfileUseCase)

      fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

      const userAuthorizerResult = await operator.exec({
        allowedProfiles: [],
        authorizeBy: 'email',
        key: `${fakeCreatedUserEntity.email}.br`,
      })

      expect(userAuthorizerResult.isLeft()).toBeTruthy()
      expect(userAuthorizerResult.isRight()).toBeFalsy()
    })

    test('Should authorize user not by role but by last chance', async () => {
      const operator = container.get(VerifyProfileUseCase)

      const userAuthorizerResult = await operator.exec({
        allowedProfiles: [],
        authorizeBy: 'email',
        key: `${fakeCreatedUserEntity.email}.br`,
        lastChance: async (user) => user.id === fakeUserEntity.id,
      })

      expect(userAuthorizerResult.isLeft()).toBeFalsy()
      expect(userAuthorizerResult.isRight()).toBeTruthy()
    })
  })

  describe('Create use case', () => {
    test('Should create role', async () => {
      const operator = container.get(CreateRoleUseCase)

      const newRoleEntity = await operator.exec(fakeRoleEntity)

      expect(newRoleEntity.isLeft()).toBeFalsy()

      if (newRoleEntity.isRight()) {
        expect(newRoleEntity.value.profile).toBe(fakeRoleEntity.profile)
      }
    })

    test('Should returns error if repository returns void', async () => {
      const operator = container.get(CreateRoleUseCase)
      fakeRoleRepositoryCreate.mockImplementationOnce(async () => {
        throw new Error()
      })
      const newRoleEntity = await operator.exec(fakeRoleEntity)

      expect(newRoleEntity.isRight()).toBeFalsy()

      if (newRoleEntity.isLeft()) {
        expect(newRoleEntity.value.statusCode).toBe(
          RolesErrors.roleFailedToCreate().statusCode
        )
        expect(newRoleEntity.value.body).toStrictEqual(
          RolesErrors.roleFailedToCreate().body
        )
      }
    })
  })

  describe('Update use case', () => {
    test('Should update role', async () => {
      const operator = container.get(UpdateRoleUseCase)

      fakeRoleRepositoryUpdate.mockImplementationOnce(
        async (input) => input.newData
      )

      const updatedRole = await operator.exec(fakeRoleEntity)

      expect(updatedRole.isLeft()).toBeFalsy()

      if (updatedRole.isRight()) {
        expect(updatedRole.value.updated_at).not.toStrictEqual(
          fakeRoleEntity.updated_at
        )
      }

      expect.assertions(2)
    })

    test('Should throws not found error if repo return void', async () => {
      const operator = container.get(UpdateRoleUseCase)
      const updatedRole = await operator.exec(fakeRoleEntity)

      expect(updatedRole.isRight()).toBeFalsy()

      if (updatedRole.isLeft()) {
        expect(updatedRole.value.statusCode).toBe(
          RolesErrors.roleNotFound().statusCode
        )
        expect(updatedRole.value.body).toStrictEqual(
          RolesErrors.roleNotFound().body
        )
      }

      expect.assertions(3)
    })

    test('Should throws server error if repo throws error', async () => {
      const operator = container.get(UpdateRoleUseCase)

      fakeRoleRepositoryUpdate.mockImplementation(() => {
        throw new Error()
      })

      const updatedRole = await operator.exec(fakeRoleEntity)

      expect(updatedRole.isRight()).toBeFalsy()

      if (updatedRole.isLeft()) {
        expect(updatedRole.value.statusCode).toBe(
          RolesErrors.roleFailedToUpdate().statusCode
        )
        expect(updatedRole.value.body).toStrictEqual(
          RolesErrors.roleFailedToUpdate().body
        )
      }

      expect.assertions(3)
    })
  })

  describe('Delete role use case', () => {
    test('Should delete a role', async () => {
      const operator = container.get(DeleteRoleUseCase)
      fakeRoleRepositoryDelete.mockImplementationOnce(
        async () => fakeRoleEntity
      )

      const deletedRole = await operator.exec({
        key: 'id',
        value: fakeRoleEntity.id,
      })

      expect(deletedRole.isLeft()).toBeFalsy()
      if (deletedRole.isRight()) {
        expect(deletedRole.value).toStrictEqual(fakeRoleEntity)
      }

      expect.assertions(2)
    })

    test('Should returns error if repository return void', async () => {
      const operator = container.get(DeleteRoleUseCase)

      const deletedRole = await operator.exec({
        key: 'id',
        value: fakeRoleEntity.id,
      })

      expect(deletedRole.isRight()).toBeFalsy()
      if (deletedRole.isLeft()) {
        expect(deletedRole.value.statusCode).toBe(
          RolesErrors.roleFailedToDelete().statusCode
        )
        expect(deletedRole.value.body).toStrictEqual(
          RolesErrors.roleFailedToDelete().body
        )
      }

      expect.assertions(3)
    })
  })
})
