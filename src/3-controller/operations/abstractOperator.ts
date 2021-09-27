import { injectable } from 'inversify'
import { ValidationError } from 'class-validator'
import { validationError } from '@root/src/2-business/module/errors/validationErrors'
import { AbstractSerializer } from '../serializers/abstractSerializer'

@injectable()
export abstract class AbstractOperator<I, O> {
  abstract run(input: I, ...args: unknown[]): Promise<O>

  protected async exec(input: AbstractSerializer<I>): Promise<void> {
    try {
      await input.validate()
    } catch (error) {
      if (
        error instanceof Array &&
        error.length &&
        error[0] instanceof ValidationError
      ) {
        const validationErrors = error as ValidationError[]

        const details = validationErrors.map((error) => ({
          property: error.property,
          value: `value <${error.value}> did not pass validation`,
          errors: Object.entries(error.constraints).map(([, value]) => value),
        }))

        throw validationError(details)
      }
    }
  }
}
