import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import { IAdressRepositoryToken } from '@business/repositories/adress/iAdressRepository'
import { UpdateAdressUseCase } from '@business/useCases/adress/updateAdressUseCase'
import { UpdateAdressOperator } from '@controller/operations/adress/update'
import { InputUpdateAdress } from '@controller/serializers/adresses/updateAdress'
import { container } from '@shared/ioc/container'
import { fakeAdressEntity } from '@tests/mock/fakes/entities/fakeAdressEntity'
import {
  fakeAdressRepositoryUpdate,
  FakeAdressRepositoy,
} from '@tests/mock/fakes/repositories/fakeAdressRepository'

describe('Update adress operator', () => {
  const adressFailedToUpdate = AdressesError.adressFailedUpdate()

  beforeAll(() => {
    container.bind(UpdateAdressOperator).to(UpdateAdressOperator)
    container.bind(UpdateAdressUseCase).to(UpdateAdressUseCase)
    container.bind(IAdressRepositoryToken).to(FakeAdressRepositoy)
  })

  test('Should create a userEntity', async () => {
    const input = new InputUpdateAdress({
      ...fakeAdressEntity,
      street: 'Rua dos bobos, 2',
    })

    fakeAdressRepositoryUpdate.mockImplementation(async (i) => i.newData)

    const operator = container.get(UpdateAdressOperator)

    const adressResult = await operator.run(input, 'uuid')

    expect(adressResult.isLeft()).toBeFalsy()
    expect(adressResult.isRight()).toBeTruthy()

    if (adressResult.isRight()) {
      expect(adressResult.value.updated_at).not.toBe(
        fakeAdressEntity.updated_at
      )
      expect(adressResult.value.street).toBe(input.street)
    }

    expect.assertions(4)
  })

  test('Should return failed to update if repository update throws', async () => {
    const input = new InputUpdateAdress(fakeAdressEntity)

    fakeAdressRepositoryUpdate.mockImplementation(async () => {
      throw new Error()
    })

    const operator = container.get(UpdateAdressOperator)

    const adressResult = await operator.run(input, 'uuid')

    expect(adressResult.isLeft()).toBeTruthy()
    expect(adressResult.isRight()).toBeFalsy()

    if (adressResult.isLeft()) {
      expect(adressResult.value.body).toStrictEqual(adressFailedToUpdate.body)
    }

    expect.assertions(3)
  })
})
