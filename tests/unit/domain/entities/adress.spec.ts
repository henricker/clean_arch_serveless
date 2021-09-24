import { AdressEntity } from '@domain/entities/adressEntity'
import { fakeCreateAdressEntity } from '@tests/mock/fakes/entities/fakeAdressEntity'

describe('Adress entity', () => {
  test('Should create a adress entity', () => {
    const adressEntityResult = AdressEntity.create(fakeCreateAdressEntity)

    expect(adressEntityResult.isRight()).toBeTruthy()
    expect(adressEntityResult.isLeft()).toBeFalsy()
  })
})
