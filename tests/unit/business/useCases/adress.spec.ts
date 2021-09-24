import { container } from '@shared/ioc/container'
import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import { IAdressRepositoryToken } from '@business/repositories/adress/iAdressRepository'
import { CreateAdressUseCase } from '@business/useCases/adress/create'
import {
  fakeAdressEntity,
  fakeCreateAdressEntity,
} from '@tests/mock/fakes/entities/fakeAdressEntity'
import {
  fakeAdressRepositoryCreate,
  FakeAdressRepositoy,
} from '@tests/mock/fakes/repositories/fakeAdressRepository'

describe('Adress use cases', () => {
  const adressFailedToCreateError = AdressesError.adressFailedToCreate()

  beforeAll(() => {
    container.bind(CreateAdressUseCase).to(CreateAdressUseCase)
    container.bind(IAdressRepositoryToken).to(FakeAdressRepositoy)
  })

  test('Should create a user entity', async () => {
    const useCase = container.get(CreateAdressUseCase)

    fakeAdressRepositoryCreate.mockImplementation(async () => fakeAdressEntity)

    const userResult = await useCase.exec(fakeCreateAdressEntity)

    expect(userResult.isLeft()).toBeFalsy()
    expect(userResult.isRight()).toBeTruthy()

    if (userResult.isRight()) {
      const user = userResult.value

      expect(user.city).toStrictEqual(fakeCreateAdressEntity.city)
      expect(user.state).toStrictEqual(fakeCreateAdressEntity.state)
      expect(user.street).toStrictEqual(fakeCreateAdressEntity.street)
      expect(user.country).toStrictEqual(fakeCreateAdressEntity.country)
      expect(user.postal_code).toStrictEqual(fakeCreateAdressEntity.postal_code)
    }
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should not create a user entity if repository throws', async () => {
    const useCase = container.get(CreateAdressUseCase)

    fakeAdressRepositoryCreate.mockImplementation(async () => {
      throw Error()
    })

    const userResult = await useCase.exec(fakeCreateAdressEntity)

    expect(userResult.isLeft()).toBeTruthy()
    expect(userResult.isRight()).toBeFalsy()

    if (userResult.isLeft()) {
      const user = userResult.value

      expect(user.body).toStrictEqual(adressFailedToCreateError.body)
    }
  })
})
