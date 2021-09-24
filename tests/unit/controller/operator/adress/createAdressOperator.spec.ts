import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import { IAdressRepositoryToken } from '@business/repositories/adress/iAdressRepository'
import { CreateAdressUseCase } from '@business/useCases/adress/create'
import { CreateAdressOperator } from '@controller/operations/adress/create'
import { InputCreateAdress } from '@controller/serializers/adresses/createAdress'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import {
  fakeAdressEntity,
  fakeCreateAdressEntity,
} from '@tests/mock/fakes/entities/fakeAdressEntity'
import {
  fakeAdressRepositoryCreate,
  FakeAdressRepositoy,
} from '@tests/mock/fakes/repositories/fakeAdressRepository'

describe('Create adress operator', () => {
  const addresFailedToCreateError = AdressesError.adressFailedToCreate()

  beforeAll(() => {
    container.bind(CreateAdressOperator).to(CreateAdressOperator)
    container.bind(CreateAdressUseCase).to(CreateAdressUseCase)
    container.bind(IAdressRepositoryToken).to(FakeAdressRepositoy)
  })

  test('Should create a adress entity', async () => {
    const operator = container.get(CreateAdressOperator)

    fakeAdressRepositoryCreate.mockImplementation(async () => fakeAdressEntity)

    const input = new InputCreateAdress(fakeCreateAdressEntity)

    const userResult = await operator.run(input)

    expect(userResult.isLeft()).toBeFalsy()
    expect(userResult.isRight()).toBeTruthy()
  })

  test('Should not create adress if city is falsy string', async () => {
    const operator = container.get(CreateAdressOperator)

    const input = new InputCreateAdress({ ...fakeCreateAdressEntity, city: '' })
    try {
      await operator.run(input)
    } catch (error) {
      expect(error).toBeInstanceOf(IError)
    }
  })

  test('Should not create adress if state is falsy string', async () => {
    const operator = container.get(CreateAdressOperator)

    const input = new InputCreateAdress({
      ...fakeCreateAdressEntity,
      state: '',
    })
    try {
      await operator.run(input)
    } catch (error) {
      expect(error).toBeInstanceOf(IError)
    }
  })

  test('Should not create adress if street is falsy string', async () => {
    const operator = container.get(CreateAdressOperator)

    const input = new InputCreateAdress({
      ...fakeCreateAdressEntity,
      street: '',
    })
    try {
      await operator.run(input)
    } catch (error) {
      expect(error).toBeInstanceOf(IError)
    }
  })

  test('Should not create adress if state is falsy string', async () => {
    const operator = container.get(CreateAdressOperator)

    const input = new InputCreateAdress({
      ...fakeCreateAdressEntity,
      country: '',
    })
    try {
      await operator.run(input)
    } catch (error) {
      expect(error).toBeInstanceOf(IError)
    }
  })

  test('Should not create adress if postal code is empty', async () => {
    const operator = container.get(CreateAdressOperator)

    const input = new InputCreateAdress({
      ...fakeCreateAdressEntity,
      postal_code: undefined,
    })
    try {
      await operator.run(input)
    } catch (error) {
      expect(error).toBeInstanceOf(IError)
    }
  })

  test('Should return IError if use case return left', async () => {
    const operator = container.get(CreateAdressOperator)

    fakeAdressRepositoryCreate.mockImplementation(async () => {
      throw Error()
    })

    const input = new InputCreateAdress(fakeCreateAdressEntity)

    const userResult = await operator.run(input)

    expect(userResult.isLeft()).toBeTruthy()
    expect(userResult.isRight()).toBeFalsy()

    if (userResult.isLeft()) {
      expect(userResult.value.body).toStrictEqual(
        addresFailedToCreateError.body
      )
    }
  })
})
