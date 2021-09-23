import { IAuthenticatorServiceToken } from '@business/services/authenticator/iAuthenticator'
import { CreateTokenUseCase } from '@business/useCases/authentication/createToken'
import { container } from '@shared/ioc/container'
import { FakeAuthenticatorService } from '@tests/mock/fakes/services/fakeAuthenticatorServiceToken'

describe('Authentication use case', () => {
  const fakeAuthenticatorServiceSign = jest.spyOn(
    FakeAuthenticatorService.prototype,
    'sing'
  )

  beforeAll(() => {
    container.bind(CreateTokenUseCase).to(CreateTokenUseCase)
    container.bind(IAuthenticatorServiceToken).to(FakeAuthenticatorService)
  })

  describe('Create token use case', () => {
    test('Should return a token', async () => {
      const operator = container.get(CreateTokenUseCase)

      const tokenResult = await operator.exec({ payload: { working: true } })

      expect(tokenResult.isLeft()).toBeFalsy()
      expect(tokenResult.isRight()).toBeTruthy()
    })

    test('Should return a token creation error if sign throws', async () => {
      const operator = container.get(CreateTokenUseCase)

      fakeAuthenticatorServiceSign.mockImplementationOnce(async () => {
        throw new Error()
      })

      const tokenResult = await operator.exec({ payload: { working: true } })

      expect(tokenResult.isLeft()).toBeTruthy()
      expect(tokenResult.isRight()).toBeFalsy()
    })
  })
})
