import { container } from '@shared/ioc/container'
import { AdressesError } from '@business/module/errors/adresses/adressesErrors'
import { IAdressRepositoryToken } from '@business/repositories/adress/iAdressRepository'
import { CreateAdressUseCase } from '@business/useCases/adress/createAdressUseCase'
import {
  fakeAdressEntity,
  fakeCreateAdressEntity,
} from '@tests/mock/fakes/entities/fakeAdressEntity'
import {
  fakeAdressRepositoryCreate,
  fakeAdressRepositoryDelete,
  fakeAdressRepositoryUpdate,
  FakeAdressRepositoy,
} from '@tests/mock/fakes/repositories/fakeAdressRepository'
import { UpdateAdressUseCase } from '@business/useCases/adress/updateAdressUseCase'
import { DeleteAdressUseCase } from '@business/useCases/adress/deleteAdressUseCase'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { FakeUniqueIdentifierService } from '@tests/mock/fakes/services/fakeUniqueIdentifierService'

describe('Adress use cases', () => {
  const adressFailedToCreateError = AdressesError.adressFailedToCreate()
  const adressFailedToUpdateError = AdressesError.adressFailedUpdate()
  const adressFailedToDeleteError = AdressesError.adressFailedDelete()

  beforeAll(() => {
    container.bind(CreateAdressUseCase).to(CreateAdressUseCase)
    container.bind(IAdressRepositoryToken).to(FakeAdressRepositoy)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
    container.bind(UpdateAdressUseCase).to(UpdateAdressUseCase)
    container.bind(DeleteAdressUseCase).to(DeleteAdressUseCase)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create use case', () => {
    test('Should create a user entity', async () => {
      const useCase = container.get(CreateAdressUseCase)

      fakeAdressRepositoryCreate.mockImplementation(
        async () => fakeAdressEntity
      )

      const userResult = await useCase.exec(fakeCreateAdressEntity)

      expect(userResult.isLeft()).toBeFalsy()
      expect(userResult.isRight()).toBeTruthy()

      if (userResult.isRight()) {
        const user = userResult.value

        expect(user.city).toStrictEqual(fakeCreateAdressEntity.city)
        expect(user.state).toStrictEqual(fakeCreateAdressEntity.state)
        expect(user.street).toStrictEqual(fakeCreateAdressEntity.street)
        expect(user.country).toStrictEqual(fakeCreateAdressEntity.country)
        expect(user.postal_code).toStrictEqual(
          fakeCreateAdressEntity.postal_code
        )
      }
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

  describe('Update use case', () => {
    test('Should update user', async () => {
      const operator = container.get(UpdateAdressUseCase)

      fakeAdressRepositoryUpdate.mockImplementation(async (i) => i.newData)

      const adressResult = await operator.exec(fakeAdressEntity, {
        type: 'id',
        key: '',
      })

      expect(adressResult.isLeft()).toBeFalsy()
      expect(adressResult.isRight()).toBeTruthy()

      if (adressResult.isRight()) {
        expect(adressResult.value.updated_at).not.toBe(
          fakeAdressEntity.updated_at
        )
      }

      expect.assertions(3)
    })

    test('Should not update user if adress repository throws', async () => {
      const operator = container.get(UpdateAdressUseCase)

      fakeAdressRepositoryUpdate.mockImplementation(async () => {
        throw new Error()
      })

      const adressResult = await operator.exec(fakeAdressEntity, {
        type: 'id',
        key: '',
      })

      expect(adressResult.isLeft()).toBeTruthy()
      expect(adressResult.isRight()).toBeFalsy()

      if (adressResult.isLeft()) {
        expect(adressResult.value.body).not.toBe(adressFailedToUpdateError.body)
      }

      expect.assertions(3)
    })
  })

  describe('Delete use case', () => {
    test('Should delete an adress', async () => {
      fakeAdressRepositoryDelete.mockImplementation(async () => void 0)

      const operator = container.get(DeleteAdressUseCase)

      const adressResult = await operator.exec({ uuid: 'fake-uuid-1234-5678' })

      expect(adressResult.isLeft()).toBeFalsy()
      expect(adressResult.isRight()).toBeTruthy()
    })

    test('Should return void if delete throws', async () => {
      fakeAdressRepositoryDelete.mockImplementation(async () => {
        throw new Error()
      })
      const operator = container.get(DeleteAdressUseCase)

      const adressResult = await operator.exec({ uuid: 'fake-uuid-1234-5678' })

      expect(adressResult.isLeft()).toBeTruthy()
      expect(adressResult.isRight()).toBeFalsy()

      if (adressResult.isLeft()) {
        expect(adressResult.value.body).toStrictEqual(
          adressFailedToDeleteError.body
        )
      }
    })
  })
})
