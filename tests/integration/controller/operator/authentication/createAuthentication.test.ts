import { container } from '@shared/ioc/container'
import '@framework/ioc/inversify.config'
import {
	typeormAfterAllConfig,
	typeormBeforeAllConfig,
	typeormBeforeEachConfig,
} from '@tests/integration/typeorm/configs'
import { CreateAuthenticationOperator } from '@controller/operations/authentication/createAuthentication'
import { InputCreateAuthentication } from '@controller/serializers/authenticator/inputCreateAuthetication'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
import { fakeCreatedUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'
import { CreateUserOperator } from '@controller/operations/user/createUser'

describe('Create authentication operator', () => {
	beforeAll(async () => {
		await typeormBeforeAllConfig()
	})

	beforeEach(async () => {
		await typeormBeforeEachConfig()
	})

	afterAll(async () => {
		await typeormAfterAllConfig()

		container.unbindAll()
	})

	test('Should create token for a user who exists', async () => {
		const inputCreateUser = new InputCreateUser(fakeCreatedUserEntity)
		const operatorCreateUser = container.get(CreateUserOperator)
		await operatorCreateUser.run(inputCreateUser)

		const input = new InputCreateAuthentication(fakeCreatedUserEntity)
		const operator = container.get(CreateAuthenticationOperator)
		const tokenResult = await operator.run(input)

		expect(tokenResult.isLeft()).toBeFalsy()

		if (tokenResult.isRight()) {
			expect(tokenResult.value.token).toBeDefined()
		}

		expect.assertions(2)
	})
})
