// Make sure that container is first called, reflect-metada is important for decorators which are used in subsequent imports
import { container } from '@shared/ioc/container'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IHasherServiceToken } from '@business/services/hasher/iHasher'
import { FakeUserRepository } from '@tests/mock/fakes/repositories/fakeUserRepository'
import { FakeHasherService } from '@tests/mock/fakes/services/fakeHasherService'
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { FakeUniqueIdentifierService } from '@tests/mock/fakes/services/fakeUniqueIdentifierService'
import { IInputCreateUserDto } from '@business/dto/user/create'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { fakeUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { SendMailUseCase } from '@business/useCases/user/sendMailUseCase'
import { IMailServiceToken } from '@business/services/mail/iMail'
import { FakeMailRepository } from '@tests/mock/fakes/repositories/fakeMailRepository'
import { UpdateUserUseCase } from '@business/useCases/user/updateUserUseCase'

describe('User use cases', () => {
  const fakeNewUser: IInputCreateUserDto = {
    email: 'fake@email',
    full_name: 'fake full name',
    password: 'fake_password',
    role_id: 0,
  }

  const fakeUserRepositoryFindBy = jest.spyOn(
    FakeUserRepository.prototype,
    'findBy'
  )

  jest.spyOn(console, 'error').mockImplementation(() => ({}))

  const createUserError = UsersErrors.entityCreationError()
  const sendMailError = UsersErrors.userEmailNotSent()
  const userNotFoundError = UsersErrors.userNotFound()

  beforeAll(() => {
    container.bind(CreateUserUseCase).to(CreateUserUseCase)
    container.bind(FindUserByUseCase).to(FindUserByUseCase)
    container.bind(SendMailUseCase).to(SendMailUseCase)
    container.bind(UpdateUserUseCase).to(UpdateUserUseCase)
    container.bind(IHasherServiceToken).to(FakeHasherService)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(IMailServiceToken).to(FakeMailRepository)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('CreateUser', () => {
    const mockRepositoryCreateUser = jest.spyOn(
      FakeUserRepository.prototype,
      'create'
    )

    test('Should create an user', async () => {
      const operator = container.get(CreateUserUseCase)

      const userEntity = await operator.exec(fakeNewUser)

      expect(userEntity.isLeft()).toBeFalsy()
      expect(userEntity.isRight()).toBeTruthy()

      if (userEntity.isRight()) {
        expect(userEntity.value.email).toBe(fakeNewUser.email)
        expect(userEntity.value.full_name).toBe(fakeNewUser.full_name)
      }

      expect.assertions(4)
    })

    test('Should throw an error if repository fails in its process', async () => {
      const operator = container.get(CreateUserUseCase)

      mockRepositoryCreateUser.mockImplementation(() => {
        throw new Error()
      })
      const userEntity = await operator.exec(fakeNewUser)

      expect(userEntity.isLeft()).toBeTruthy()
      expect(userEntity.isRight()).toBeFalsy()

      if (userEntity.isLeft()) {
        expect(userEntity.value.statusCode).toBe(createUserError.statusCode)
        expect(userEntity.value.body).toStrictEqual(createUserError.body)
      }

      expect.assertions(4)
    })
  })

  describe('FindUserBy', () => {
    test('Should return user if it exists', async () => {
      const userFindByUseCase = container.get(FindUserByUseCase)

      fakeUserRepositoryFindBy.mockImplementation(async () => fakeUserEntity)

      const userResult = await userFindByUseCase.exec({
        key: 'email',
        value: fakeUserEntity.email,
      })

      expect(userResult.isLeft()).toBeFalsy()
      expect(userResult.isRight()).toBeTruthy()
    })

    test('Should not find user if it does not exists', async () => {
      const userRepository = container.get(FindUserByUseCase)

      fakeUserRepositoryFindBy.mockImplementation(async () => void 0)

      const userResult = await userRepository.exec({
        key: 'email',
        value: 'nonexistent@email.com',
      })

      expect(userResult.isLeft()).toBeTruthy()
      expect(userResult.isRight()).toBeFalsy()

      if (userResult.isLeft()) {
        expect(userResult.value.statusCode).toBe(userNotFoundError.statusCode)
        expect(userResult.value.body).toStrictEqual(userNotFoundError.body)
      }

      expect.assertions(4)
    })
  })

  describe('sendMail', () => {
    const mockRepositorySendMail = jest.spyOn(
      FakeMailRepository.prototype,
      'send'
    )

    test('Should return right if mailService succeeded', async () => {
      const mailRepository = container.get(SendMailUseCase)

      const mailSend = await mailRepository.exec({
        to: 'string',
        subject: 'string',
        payload: { string: 'string' },
        templatePath: 'string',
      })

      expect(mailSend.isLeft()).toBeFalsy()
      expect(mailSend.isRight()).toBeTruthy()
      expect(mockRepositorySendMail).toBeCalledTimes(1)
    })

    test('Should return left if mailService failed', async () => {
      const mailRepository = container.get(SendMailUseCase)

      mockRepositorySendMail.mockImplementation(() => {
        throw new Error()
      })

      const mailSend = await mailRepository.exec({
        to: 'string',
        subject: 'string',
        payload: { string: 'string' },
        templatePath: 'string',
      })

      expect(mailSend.isRight()).toBeFalsy()
      expect(mockRepositorySendMail).toBeCalledTimes(1)

      if (mailSend.isLeft()) {
        expect(mailSend.value.statusCode).toBe(sendMailError.statusCode)
        expect(mailSend.value.body).toStrictEqual(sendMailError.body)
      }

      expect.assertions(4)
    })
  })

  describe('updateUser', () => {
    const mockUserUpdate = jest.spyOn(FakeUserRepository.prototype, 'update')

    test('Should return user updated if repository.update returns user', async () => {
      const updateRepository = container.get(UpdateUserUseCase)
      mockUserUpdate.mockImplementationOnce(async () => fakeUserEntity)
      const userUpdated = await updateRepository.exec(fakeUserEntity)
      expect(userUpdated.isLeft()).toBeFalsy()

      if (userUpdated.isRight()) {
        expect(userUpdated.value).toBe(fakeUserEntity)
      }

      expect.assertions(2)
    })

    test('Should throws user not found error if repository.update returns void', async () => {
      const updateRepository = container.get(UpdateUserUseCase)
      const userUpdated = await updateRepository.exec(fakeUserEntity)
      expect(userUpdated.isRight()).toBeFalsy()

      if (userUpdated.isLeft()) {
        expect(userUpdated.value.statusCode).toBe(
          UsersErrors.userNotFound().statusCode
        )
        expect(userUpdated.value.body).toStrictEqual(
          UsersErrors.userNotFound().body
        )
      }

      expect.assertions(3)
    })

    test('Should throws user not found error if repository.update returns void', async () => {
      const updateRepository = container.get(UpdateUserUseCase)

      mockUserUpdate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const userUpdated = await updateRepository.exec(fakeUserEntity)
      expect(userUpdated.isRight()).toBeFalsy()

      if (userUpdated.isLeft()) {
        expect(userUpdated.value.statusCode).toBe(
          UsersErrors.userFailedToUpdate().statusCode
        )
        expect(userUpdated.value.body).toStrictEqual(
          UsersErrors.userFailedToUpdate().body
        )
      }

      expect.assertions(3)
    })
  })
})
