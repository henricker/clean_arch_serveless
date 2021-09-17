import { AbstractOperator } from '@controller/operations/abstractOperator'
import { AbstractSerializer } from '@controller/serializers/abstractSerializer'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { validationError } from '@business/module/errors/validationErrors'

describe('Abstract Operator', () => {
	describe('Exec', () => {
		test('Should return a formated error in error throw', async () => {
			interface InputFake {
				name: string
				email: string
			}

			class FakeAbstractSerializer extends AbstractSerializer<InputFake> {
				@IsString()
				@MinLength(5)
				name: string

				@IsString()
				@IsEmail()
				email: string
			}

			class FakeExtendedAbstractOperator extends AbstractOperator<
				InputFake,
				void
			> {
				async run(_i: InputFake) {}
			}

			const serializer = new FakeAbstractSerializer({
				name: 'Fake',
				email: 'not.a.valid.email',
			})

			try {
				await new FakeExtendedAbstractOperator().exec(serializer)
			} catch (error) {
				const err = error as unknown as ReturnType<typeof validationError>

				const body = JSON.parse(err.body)

				expect(err.statusCode).toBe(400)
				expect(body.message).toBe('ValidationError')
			}
			expect.assertions(2)
		})
	})
})
