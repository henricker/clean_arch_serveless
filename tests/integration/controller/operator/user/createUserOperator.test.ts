import { container } from '@shared/ioc/container'
import {
	typeormAfterAllConfig,
	typeormBeforeAllConfig,
	typeormBeforeEachConfig,
} from '@tests/integration/typeorm/configs'
import '@framework/ioc/inversify.config'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { fakeCreatedUserEntity } from '@tests/mock/fakes/entities/fakeUserEntity'

describe('Create user operator', () => {
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

	test('Should create a user if email is avaible', async () => {
		const input = new InputCreateUser(fakeCreatedUserEntity)

		const operator = container.get(CreateUserOperator)

		const userResult = await operator.run(input)

		expect(userResult.isLeft()).toBeFalsy()
		if (userResult.isRight()) {
			expect(userResult.value.id).toBeDefined()
		}
		expect.assertions(2)
	})

	test('Should not create user if email is not avaible', async () => {
		const input = new InputCreateUser(fakeCreatedUserEntity)

		const operator = container.get(CreateUserOperator)

		await operator.run(input)
		const userResult = await operator.run(input)

		expect(userResult.isLeft()).toBeTruthy()
	})
})
