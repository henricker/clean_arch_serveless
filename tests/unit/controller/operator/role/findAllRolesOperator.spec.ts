import { RolesErrors } from '@root/src/2-business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import { IRoleRepositoryToken } from '@root/src/2-business/repositories/role/iRoleRepository'
import { IUserRepositoryToken } from '@root/src/2-business/repositories/user/iUserRepository'
import { FindAllRolesUseCase } from '@root/src/2-business/useCases/role/findAllRolesUseCase'
import { VerifyProfileUseCase } from '@root/src/2-business/useCases/role/verifyProfileUseCase'
import { FindAllRolesOperator } from '@root/src/3-controller/operations/roles/findAllRoles'
import { InputFindAllRole } from '@root/src/3-controller/serializers/role/inputFindAllRole'
import { container } from '@shared/ioc/container'
import { fakeRolesList } from '@tests/mock/fakes/entities/fakeRoleEntity'
import { fakeUserAdminEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import {
  FakeRoleRepository,
  fakeRoleRepositoryFindAll,
} from '@tests/mock/fakes/repositories/fakeRoleRepository'
import {
  FakeUserRepository,
  fakeUserRepositoryFindBy,
} from '@tests/mock/fakes/repositories/fakeUserRepository'

describe('Find all roles operator', () => {
  beforeAll(() => {
    container.bind(FindAllRolesUseCase).to(FindAllRolesUseCase)
    container.bind(FindAllRolesOperator).to(FindAllRolesOperator)
    container.bind(VerifyProfileUseCase).to(VerifyProfileUseCase)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should find all roles', async () => {
    const operator = container.get(FindAllRolesOperator)
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    fakeRoleRepositoryFindAll.mockImplementationOnce(async () => ({
      count: 4,
      page: 1,
      roles: fakeRolesList,
    }))
    const fakePaginate = { limit: 10, page: 1 }
    const inputFindAllRole = new InputFindAllRole(fakePaginate)

    const roles = await operator.run(inputFindAllRole, fakeUserAdminEntity.id)

    expect(roles.isLeft()).toBeFalsy()

    if (roles.isRight()) {
      expect(roles.value.roles.length).toBe(4)
      roles.value.roles.forEach((role) => {
        expect(role).toHaveProperty('id')
        expect(role).toHaveProperty('profile')
      })
    }

    expect.assertions(10)
  })

  test('Should returns error if role repository return void', async () => {
    const operator = container.get(FindAllRolesOperator)
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    const roles = await operator.run(void 0, fakeUserAdminEntity.id)

    expect(roles.isRight()).toBeFalsy()

    if (roles.isLeft()) {
      expect(roles.value.statusCode).toBe(
        RolesErrors.rolesFailedToLoad().statusCode
      )
      expect(roles.value.body).toStrictEqual(
        RolesErrors.rolesFailedToLoad().body
      )
    }

    expect.assertions(3)
  })

  test('Should returns error if user repository return void', async () => {
    const operator = container.get(FindAllRolesOperator)
    fakeRoleRepositoryFindAll.mockImplementationOnce(async () => ({
      count: 4,
      page: 1,
      roles: fakeRolesList,
    }))
    const roles = await operator.run(void 0, fakeUserAdminEntity.id)

    expect(roles.isRight()).toBeFalsy()

    if (roles.isLeft()) {
      expect(roles.value.statusCode).toBe(UsersErrors.userNotFound().statusCode)
      expect(roles.value.body).toStrictEqual(UsersErrors.userNotFound().body)
    }

    expect.assertions(3)
  })
})
