import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { DeleteRoleUseCase } from '@business/useCases/role/deleteRoleUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { DeleteRoleOperator } from '@controller/operations/roles/deleteRole'
import { InputDeleteRole } from '@controller/serializers/role/inputDeleteRole'
import { container } from '@shared/ioc/container'
import { fakeRoleEntity } from '@tests/mock/fakes/entities/fakeRoleEntity'
import { fakeUserAdminEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import {
  FakeRoleRepository,
  fakeRoleRepositoryDelete,
  fakeRoleRepositoryFindBy,
} from '@tests/mock/fakes/repositories/fakeRoleRepository'
import {
  FakeUserRepository,
  fakeUserRepositoryFindBy,
} from '@tests/mock/fakes/repositories/fakeUserRepository'

describe('Delete role operator', () => {
  beforeAll(() => {
    container.bind(DeleteRoleOperator).to(DeleteRoleOperator)
    container.bind(VerifyProfileUseCase).to(VerifyProfileUseCase)
    container.bind(FindRoleByUseCase).to(FindRoleByUseCase)
    container.bind(DeleteRoleUseCase).to(DeleteRoleUseCase)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should delete a role', async () => {
    const inputDeleteRole = new InputDeleteRole({ id: 1 })
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    fakeRoleRepositoryFindBy.mockImplementationOnce(async () => fakeRoleEntity)

    fakeRoleRepositoryDelete.mockImplementationOnce(async () => fakeRoleEntity)

    const operator = container.get(DeleteRoleOperator)
    const roleId = await operator.run(inputDeleteRole, fakeUserAdminEntity.id)

    expect(roleId.isLeft()).toBeFalsy()

    if (roleId.isRight()) {
      expect(roleId.value).toStrictEqual(fakeRoleEntity)
    }

    expect.assertions(2)
  })

  test('Should returns error if findBy of role returns void', async () => {
    const inputDeleteRole = new InputDeleteRole({ id: 1 })
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    const operator = container.get(DeleteRoleOperator)
    const roleId = await operator.run(inputDeleteRole, fakeUserAdminEntity.id)

    expect(roleId.isRight()).toBeFalsy()

    if (roleId.isLeft()) {
      expect(roleId.value.statusCode).toBe(
        RolesErrors.roleNotFound().statusCode
      )
      expect(roleId.value.body).toStrictEqual(RolesErrors.roleNotFound().body)
    }
  })

  test('Should returns error if delete of role return void', async () => {
    const inputDeleteRole = new InputDeleteRole({ id: 1 })
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    fakeRoleRepositoryFindBy.mockImplementationOnce(async () => fakeRoleEntity)

    const operator = container.get(DeleteRoleOperator)
    const roleId = await operator.run(inputDeleteRole, fakeUserAdminEntity.id)

    expect(roleId.isRight()).toBeFalsy()

    if (roleId.isLeft()) {
      expect(roleId.value.statusCode).toBe(
        RolesErrors.roleFailedToDelete().statusCode
      )
      expect(roleId.value.body).toStrictEqual(
        RolesErrors.roleFailedToDelete().body
      )
    }
  })

  test('Should returns error if findBy of auth user returns void', async () => {
    const inputDeleteRole = new InputDeleteRole({ id: 1 })
    fakeRoleRepositoryFindBy.mockImplementationOnce(async () => fakeRoleEntity)

    const operator = container.get(DeleteRoleOperator)
    const roleId = await operator.run(inputDeleteRole, fakeUserAdminEntity.id)

    expect(roleId.isRight()).toBeFalsy()

    if (roleId.isLeft()) {
      expect(roleId.value.statusCode).toBe(
        UsersErrors.userNotFound().statusCode
      )
      expect(roleId.value.body).toStrictEqual(UsersErrors.userNotFound().body)
    }
  })
})
