import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { UpdateRoleUseCase } from '@business/useCases/role/updateRoleUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { UpdateRoleOperator } from '@controller/operations/roles/updateRole'
import { InputUpdateRole } from '@controller/serializers/role/inputUpdateRole'
import { container } from '@shared/ioc/container'
import { fakeRoleEntity } from '@tests/mock/fakes/entities/fakeRoleEntity'
import { fakeUserAdminEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import { FakeRoleRepository } from '@tests/mock/fakes/repositories/fakeRoleRepository'
import { FakeUserRepository } from '@tests/mock/fakes/repositories/fakeUserRepository'

describe('Update role operator', () => {
  const fakeRoleRepositoryFindBy = jest.spyOn(
    FakeRoleRepository.prototype,
    'findBy'
  )

  const fakeUserRepositoryFindBy = jest
    .spyOn(FakeUserRepository.prototype, 'findBy')
    .mockImplementation(async () => fakeUserAdminEntity)

  const fakeRoleRepositoryUpdate = jest.spyOn(
    FakeRoleRepository.prototype,
    'update'
  )

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
