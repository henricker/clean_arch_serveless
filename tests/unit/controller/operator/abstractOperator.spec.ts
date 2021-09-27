import { AbstractOperator } from '@root/src/3-controller/operations/abstractOperator'
import { AbstractSerializer } from '@root/src/3-controller/serializers/abstractSerializer'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { IError } from '@shared/IError'

describe('Abstract Operator', () => {
  describe('Exec', () => {
    test('Should return a formated error in error throw', async () => {
      interface IInputFake {
        name: string
        email: string
      }

      class FakeAbstractSerializer extends AbstractSerializer<IInputFake> {
        @IsString()
        @MinLength(5)
        name: string

        @IsString()
        @IsEmail()
        email: string
      }

      class FakeExtendedAbstractOperator extends AbstractOperator<
        FakeAbstractSerializer,
        void
      > {
        async run(i: FakeAbstractSerializer) {
          await this.exec(i)
        }
      }

      const serializer = new FakeAbstractSerializer({
        name: 'Fake',
        email: 'not.a.valid.email',
      })

      try {
        await new FakeExtendedAbstractOperator().run(serializer)
      } catch (error) {
        const err = error as unknown as IError

        expect(err.statusCode).toBe(400)
        expect(err.body.code).toBeDefined()
        expect(err.body.message).toBeDefined()
        expect(err.body.shortMessage).toBeDefined()
      }
      expect.assertions(4)
    })
  })
})
