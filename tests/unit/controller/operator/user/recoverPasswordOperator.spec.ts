import { container } from '@shared/ioc/container'
import { FindUserByUseCase } from '@root/src/2-business/useCases/user/findUserByUseCase'
import {
  FakeUserRepository,
  fakeUserRepositoryFindBy,
  fakeUserRepositoryUpdate,
} from '@tests/mock/fakes/repositories/fakeUserRepository'
import { IUserRepositoryToken } from '@root/src/2-business/repositories/user/iUserRepository'
import { SendMailUseCase } from '@root/src/2-business/useCases/user/sendMailUseCase'
import { IMailServiceToken } from '@root/src/2-business/services/mail/iMail'
import { FakeMailService } from '@tests/mock/fakes/services/fakeMailService'
import { RecoverPasswordOperator } from '@root/src/3-controller/operations/user/recoverPassword'
import { UpdateUserUseCase } from '@root/src/2-business/useCases/user/updateUserUseCase'
import { FakeUniqueIdentifierService } from '@tests/mock/fakes/services/fakeUniqueIdentifierService'
import { IUniqueIdentifierServiceToken } from '@root/src/2-business/services/uniqueIdentifier/iUniqueIdentifier'
import { InputRecoverPassword } from '@root/src/3-controller/serializers/user/inputRecoverPassword'
import { fakeUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import { ITimeServiceToken } from '@root/src/2-business/services/time/iTime'
import { FakeTimeService } from '@tests/mock/fakes/services/fakeTimeService'
import { IHasherServiceToken } from '@business/services/hasher/iHasher'
import { FakeHasherService } from '@tests/mock/fakes/services/fakeHasherService'

describe('Recover password operator', () => {
  const fakeMailServiceSend = jest.spyOn(FakeMailService.prototype, 'send')

  const usetNotFoundError = UsersErrors.userNotFound()
  const userFailedToUpdateError = UsersErrors.userFailedToUpdate()
  const userEmailNotSent = UsersErrors.userEmailNotSent()

  beforeAll(() => {
    container.bind(RecoverPasswordOperator).to(RecoverPasswordOperator)
    container.bind(FindUserByUseCase).to(FindUserByUseCase)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(SendMailUseCase).to(SendMailUseCase)
    container.bind(IMailServiceToken).to(FakeMailService)
    container.bind(UpdateUserUseCase).to(UpdateUserUseCase)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
    container.bind(ITimeServiceToken).to(FakeTimeService)
    container.bind(IHasherServiceToken).to(FakeHasherService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should send an recover password email and change redirectURL', async () => {
    const input = new InputRecoverPassword({
      userEmail: fakeUserEntity.email,
      redirectUrl: 'https://fake.recover.password',
    })

    fakeUserRepositoryFindBy.mockImplementationOnce(async () => fakeUserEntity)
    fakeUserRepositoryUpdate.mockImplementationOnce(async () => fakeUserEntity)

    const operator = container.get(RecoverPasswordOperator)

    const emailResult = await operator.run(input)

    expect(emailResult.isLeft()).toBeFalsy()
    expect(emailResult.isRight()).toBeTruthy()
  })

  test('Should send an recover password email', async () => {
    const input = new InputRecoverPassword({
      userEmail: fakeUserEntity.email,
      redirectUrl: 'https://fake.recover.password/',
    })

    fakeUserRepositoryFindBy.mockImplementationOnce(async () => fakeUserEntity)
    fakeUserRepositoryUpdate.mockImplementationOnce(async () => fakeUserEntity)

    const operator = container.get(RecoverPasswordOperator)

    const emailResult = await operator.run(input)

    expect(emailResult.isLeft()).toBeFalsy()
    expect(emailResult.isRight()).toBeTruthy()
  })

  test('Should not send an recover password email if user does not exists', async () => {
    const input = new InputRecoverPassword({
      userEmail: fakeUserEntity.email,
      redirectUrl: 'https://fake.recover.password/',
    })

    fakeUserRepositoryFindBy.mockImplementationOnce(async () => void 0)

    const operator = container.get(RecoverPasswordOperator)

    const emailResult = await operator.run(input)

    expect(emailResult.isLeft()).toBeTruthy()
    expect(emailResult.isRight()).toBeFalsy()

    if (emailResult.isLeft()) {
      expect(emailResult.value.body).toStrictEqual(usetNotFoundError.body)
    }

    expect.assertions(3)
  })

  test('Should not send an recover password email if user update throws', async () => {
    const input = new InputRecoverPassword({
      userEmail: fakeUserEntity.email,
      redirectUrl: 'https://fake.recover.password/',
    })

    fakeUserRepositoryFindBy.mockImplementationOnce(async () => fakeUserEntity)
    fakeUserRepositoryUpdate.mockImplementationOnce(async () => {
      throw new Error()
    })

    const operator = container.get(RecoverPasswordOperator)

    const emailResult = await operator.run(input)

    expect(emailResult.isLeft()).toBeTruthy()
    expect(emailResult.isRight()).toBeFalsy()

    if (emailResult.isLeft()) {
      expect(emailResult.value.body).toStrictEqual(userFailedToUpdateError.body)
    }

    expect.assertions(3)
  })

  test('Should return IError if SendMailUseCase throws', async () => {
    const input = new InputRecoverPassword({
      userEmail: fakeUserEntity.email,
      redirectUrl: 'https://fake.recover.password/',
    })

    fakeUserRepositoryFindBy.mockImplementationOnce(async () => fakeUserEntity)
    fakeUserRepositoryUpdate.mockImplementationOnce(async () => fakeUserEntity)
    fakeMailServiceSend.mockImplementationOnce(async () => {
      throw new Error()
    })

    const operator = container.get(RecoverPasswordOperator)

    const emailResult = await operator.run(input)

    expect(emailResult.isLeft()).toBeTruthy()
    expect(emailResult.isRight()).toBeFalsy()

    if (emailResult.isLeft()) {
      expect(emailResult.value.body).toStrictEqual(userEmailNotSent.body)
    }

    expect.assertions(3)
  })
})
