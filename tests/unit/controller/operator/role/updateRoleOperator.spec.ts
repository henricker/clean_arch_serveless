import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { UpdateRoleUseCase } from '@business/useCases/role/updateRoleUseCase'
import { UpdateRoleOperator } from '@controller/operations/roles/updateRole'
import { InputUpdateRole } from '@controller/serializers/role/inputUpdateRole'
import { container } from '@shared/ioc/container'
import { fakeRoleEntity } from '@tests/mock/fakes/entities/fakeRoleEntity'
import { FakeRoleRepository } from '@tests/mock/fakes/repositories/fakeRoleRepository'

describe('Update role operator', () => {
  const fakeRoleRepositoryFindBy = jest.spyOn(
    FakeRoleRepository.prototype,
    'findBy'
  )

  const fakeRoleRepositoryUpdate = jest.spyOn(
    FakeRoleRepository.prototype,
    'update'
  )

  beforeAll(() => {
    container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
    container.bind(UpdateRoleOperator).to(UpdateRoleOperator)
    container.bind(FindRoleByUseCase).to(FindRoleByUseCase)
    container.bind(UpdateRoleUseCase).to(UpdateRoleUseCase)
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

    const role = await operator.run(inputUpdateRole)

    expect(role.isLeft()).toBeFalsy()

    if (role.isRight()) {
      expect(role.value.profile).toBe('dev')
    }

    expect.assertions(2)
  })

  test('Should returns error if role not found', async () => {
    const inputUpdateRole = new InputUpdateRole(fakeRoleEntity)
    const operator = container.get(UpdateRoleOperator)

    const role = await operator.run(inputUpdateRole)

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
    const role = await operator.run(inputUpdateRole)

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
