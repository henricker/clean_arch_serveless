import { container } from '@shared/ioc/container'
import { AuthenticationErrors } from '@business/module/errors/authentication/authenticationErrors'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IAuthenticatorServiceToken } from '@business/services/authenticator/iAuthenticator'
import { IHasherServiceToken } from '@business/services/hasher/iHasher'
import { CreateTokenUseCase } from '@business/useCases/authentication/createToken'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { CreateAuthenticationOperator } from '@controller/operations/authentication/createAuthentication'
import { InputCreateAuthentication } from '@controller/serializers/authenticator/inputCreateAuthetication'
import { fakeUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import { FakeUserRepository } from '@tests/mock/fakes/repositories/fakeUserRepository'
import { FakeAuthenticatorService } from '@tests/mock/fakes/services/fakeAuthenticatorService'
import { FakeHasherService } from '@tests/mock/fakes/services/fakeHasherService'

describe('Create authentication operator', () => {
  const fakeUserRepositoryFindBy = jest.spyOn(
    FakeUserRepository.prototype,
    'findBy'
  )
  const fakeHasherServiceCompare = jest.spyOn(
    FakeHasherService.prototype,
    'compare'
  )
  const fakeAuthenticatorServiceSing = jest.spyOn(
    FakeAuthenticatorService.prototype,
    'sing'
  )

  const userNotFoundError = UsersErrors.userNotFound()
  const authenticationInvalidCredentialsError =
    AuthenticationErrors.invalidCredentials()
  const tokenCreationError = AuthenticationErrors.tokenCreationError()

  beforeAll(() => {
    container
      .bind(CreateAuthenticationOperator)
      .to(CreateAuthenticationOperator)
    container.bind(FindUserByUseCase).to(FindUserByUseCase)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(CreateTokenUseCase).to(CreateTokenUseCase)
    container.bind(IAuthenticatorServiceToken).to(FakeAuthenticatorService)
    container.bind(IHasherServiceToken).to(FakeHasherService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should create an authentication token', async () => {
    const input = new InputCreateAuthentication({
      email: fakeUserEntity.email,
      password: fakeUserEntity.password,
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)
    fakeHasherServiceCompare.mockImplementation(async () => true)

    const operator = container.get(CreateAuthenticationOperator)

    const authenticationResult = await operator.run(input)

    expect(authenticationResult.isLeft()).toBeFalsy()
    expect(authenticationResult.isRight()).toBeTruthy()
  })

  test('Should not create an authentication token if user is not found', async () => {
    const input = new InputCreateAuthentication({
      email: fakeUserEntity.email,
      password: fakeUserEntity.password,
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => void 0)

    const operator = container.get(CreateAuthenticationOperator)

    const authenticationResult = await operator.run(input)

    expect(authenticationResult.isLeft()).toBeTruthy()
    expect(authenticationResult.isRight()).toBeFalsy()

    if (authenticationResult.isLeft()) {
      expect(authenticationResult.value.body).toStrictEqual(
        userNotFoundError.body
      )
    }

    expect.assertions(3)
  })

  test('Should not create an authentication token if user password is wrong', async () => {
    const input = new InputCreateAuthentication({
      email: fakeUserEntity.email,
      password: 'wrong_password',
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)
    fakeHasherServiceCompare.mockImplementation(async () => false)

    const operator = container.get(CreateAuthenticationOperator)

    const authenticationResult = await operator.run(input)

    expect(authenticationResult.isLeft()).toBeTruthy()
    expect(authenticationResult.isRight()).toBeFalsy()

    if (authenticationResult.isLeft()) {
      expect(authenticationResult.value.body).toStrictEqual(
        authenticationInvalidCredentialsError.body
      )
    }

    expect.assertions(3)
  })

  test('Should not create an authentication token if token creation throws', async () => {
    const input = new InputCreateAuthentication({
      email: fakeUserEntity.email,
      password: 'wrong_password',
    })

    fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)
    fakeHasherServiceCompare.mockImplementation(async () => true)
    fakeAuthenticatorServiceSing.mockImplementation(async () => {
      throw new Error()
    })

    const operator = container.get(CreateAuthenticationOperator)

    const authenticationResult = await operator.run(input)

    expect(authenticationResult.isLeft()).toBeTruthy()
    expect(authenticationResult.isRight()).toBeFalsy()

    if (authenticationResult.isLeft()) {
      expect(authenticationResult.value.body).toStrictEqual(
        tokenCreationError.body
      )
    }

    expect.assertions(3)
  })
})
