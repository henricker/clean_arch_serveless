import { RolesErrors } from '@root/src/2-business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import { IRoleRepositoryToken } from '@root/src/2-business/repositories/role/iRoleRepository'
import { IUserRepositoryToken } from '@root/src/2-business/repositories/user/iUserRepository'
import { FindRoleByUseCase } from '@root/src/2-business/useCases/role/findRoleByUseCase'
import { UpdateRoleUseCase } from '@root/src/2-business/useCases/role/updateRoleUseCase'
import { VerifyProfileUseCase } from '@root/src/2-business/useCases/role/verifyProfileUseCase'
import { UpdateRoleOperator } from '@root/src/3-controller/operations/roles/updateRole'
import { InputUpdateRole } from '@root/src/3-controller/serializers/role/inputUpdateRole'
import { container } from '@shared/ioc/container'
import { fakeRoleEntity } from '@tests/mock/fakes/entities/fakeRoleEntity'
import { fakeUserAdminEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import {
  FakeRoleRepository,
  fakeRoleRepositoryFindBy,
  fakeRoleRepositoryUpdate,
} from '@tests/mock/fakes/repositories/fakeRoleRepository'
import {
  FakeUserRepository,
  fakeUserRepositoryFindBy,
} from '@tests/mock/fakes/repositories/fakeUserRepository'

describe('Update role operator', () => {
  beforeAll(() => {
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
    container.bind(UpdateRoleOperator).to(UpdateRoleOperator)
    container.bind(FindRoleByUseCase).to(FindRoleByUseCase)
    container.bind(UpdateRoleUseCase).to(UpdateRoleUseCase)
    container.bind(VerifyProfileUseCase).to(VerifyProfileUseCase)
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should update a role', async () => {
    const inputUpdateRole = new InputUpdateRole(fakeRoleEntity)
    const operator = container.get(UpdateRoleOperator)
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    fakeRoleRepositoryFindBy.mockImplementationOnce(async () => fakeRoleEntity)
    fakeRoleRepositoryUpdate.mockImplementationOnce(async () => ({
      ...fakeRoleEntity,
      profile: 'dev',
    }))

    const role = await operator.run(inputUpdateRole, fakeRoleEntity.id)

    expect(role.isLeft()).toBeFalsy()

    if (role.isRight()) {
      expect(role.value.profile).toBe('dev')
    }

    expect.assertions(2)
  })

  test('Should returns error if user not authenticate', async () => {
    const inputUpdateRole = new InputUpdateRole(fakeRoleEntity)
    const operator = container.get(UpdateRoleOperator)

    fakeUserRepositoryFindBy.mockImplementationOnce(() => void 0)
    const role = await operator.run(inputUpdateRole, fakeRoleEntity.id)

    expect(role.isRight()).toBeFalsy()

    if (role.isLeft()) {
      expect(role.value.statusCode).toBe(UsersErrors.userNotFound().statusCode)
      expect(role.value.body).toStrictEqual(UsersErrors.userNotFound().body)
    }

    expect.assertions(3)
  })

  test('Should returns error if role not found', async () => {
    const inputUpdateRole = new InputUpdateRole(fakeRoleEntity)
    const operator = container.get(UpdateRoleOperator)
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    const role = await operator.run(inputUpdateRole, fakeRoleEntity.id)

    expect(role.isRight()).toBeFalsy()

    if (role.isLeft()) {
      expect(role.value.statusCode).toBe(RolesErrors.roleNotFound().statusCode)
      expect(role.value.body).toStrictEqual(RolesErrors.roleNotFound().body)
    }

    expect.assertions(3)
  })

  test('Should returns error if role not found', async () => {
    const inputUpdateRole = new InputUpdateRole(fakeRoleEntity)
    const operator = container.get(UpdateRoleOperator)
    fakeUserRepositoryFindBy.mockImplementationOnce(
      async () => fakeUserAdminEntity
    )
    fakeRoleRepositoryFindBy.mockImplementationOnce(async () => fakeRoleEntity)
    fakeRoleRepositoryUpdate.mockImplementationOnce(() => {
      throw new Error()
    })
    const role = await operator.run(inputUpdateRole, fakeRoleEntity.id)

    expect(role.isRight()).toBeFalsy()

    if (role.isLeft()) {
      expect(role.value.statusCode).toBe(
        RolesErrors.roleFailedToUpdate().statusCode
      )
      expect(role.value.body).toStrictEqual(
        RolesErrors.roleFailedToUpdate().body
      )
    }

    expect.assertions(3)
  })
})
