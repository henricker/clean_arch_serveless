import { container } from '@shared/ioc/container'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import {
  FakeUserRepository,
  fakeUserRepositoryFindBy,
} from '@tests/mock/fakes/repositories/fakeUserRepository'
import { InputShowUser } from '@controller/serializers/user/inputShowUser'
import {
  fakeUserAdminEntity,
  fakeUserEntity,
} from '@tests/mock/fakes/entities/fakeUserEntity'
import { ShowUserOperator } from '@controller/operations/user/showUser'
import { IError } from '@shared/IError'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@business/module/errors/users/usersErrors'

describe('Show user operator', () => {
  const roleNotAllowedError = RolesErrors.roleNotAllowed()
  const userNotFoundError = UsersErrors.userNotFound()

  beforeAll(() => {
    container.bind(ShowUserOperator).to(ShowUserOperator)
    container.bind(VerifyProfileUseCase).to(VerifyProfileUseCase)
    container.bind(FindUserByUseCase).to(FindUserByUseCase)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should show an user', async () => {
    const input = new InputShowUser({
      user_uuid: fakeUserEntity.uuid,
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

    const operator = container.get(ShowUserOperator)

    const userResult = await operator.run(input, fakeUserEntity.id)

    expect(userResult.isLeft()).toBeFalsy()
    expect(userResult.isRight()).toBeTruthy()

    if (userResult.isRight()) {
      expect(userResult.value.uuid).toBe(fakeUserEntity.uuid)
    }

    expect.assertions(3)
  })

  test('Should not show an user with amiss uuid', async () => {
    const input = new InputShowUser({
      user_uuid: fakeUserEntity.uuid.split('-')[0],
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

    const operator = container.get(ShowUserOperator)

    try {
      await operator.run(input, fakeUserEntity.id)
    } catch (error) {
      expect(error).toBeInstanceOf(IError)
    }
  })

  test('Should not show user to an unallowed user', async () => {
    const input = new InputShowUser({
      user_uuid: fakeUserEntity.uuid,
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

    const operator = container.get(ShowUserOperator)

    const userResult = await operator.run(input, fakeUserEntity.id + 1)

    expect(userResult.isLeft()).toBeTruthy()
    expect(userResult.isRight()).toBeFalsy()

    if (userResult.isLeft()) {
      expect(userResult.value.body).toStrictEqual(roleNotAllowedError.body)
    }

    expect.assertions(3)
  })

  test('Should show any user to an admin user', async () => {
    const input = new InputShowUser({
      user_uuid: fakeUserEntity.uuid,
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserAdminEntity)

    const operator = container.get(ShowUserOperator)

    const userResult = await operator.run(input, fakeUserAdminEntity.id + 1)

    expect(userResult.isLeft()).toBeFalsy()
    expect(userResult.isRight()).toBeTruthy()
  })

  test('Should not show an user unexistent to an admin user', async () => {
    const input = new InputShowUser({
      user_uuid: fakeUserEntity.uuid,
    })

    fakeUserRepositoryFindBy
      .mockImplementationOnce(async () => fakeUserAdminEntity)
      .mockImplementationOnce(async () => void 0)

    const operator = container.get(ShowUserOperator)

    const userResult = await operator.run(input, fakeUserAdminEntity.id + 1)

    expect(userResult.isLeft()).toBeTruthy()
    expect(userResult.isRight()).toBeFalsy()

    if (userResult.isLeft()) {
      expect(userResult.value.body).toStrictEqual(userNotFoundError.body)
    }

    expect.assertions(3)
  })
})
