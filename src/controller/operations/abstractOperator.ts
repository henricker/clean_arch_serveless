import { ValidationError } from 'class-validator'
import { validationError } from '@business/module/errors/validationErrors'
import { AbstractSerializer } from '../serializers/abstractSerializer'
import { injectable } from 'inversify'

@injectable()
export abstract class AbstractOperator<I, O> {
	abstract run(input: I): Promise<O>

	public async exec(input: AbstractSerializer<I>): Promise<void> {
		try {
			await input.validate()
		} catch (error) {
			if (
				error instanceof Array &&
				error.length &&
				error[0] instanceof ValidationError
			) {
				const validationErrors = error as ValidationError[]

				const details = validationErrors.map((x) => ({
					property: x.property,
					value: `value <${x.value}> did not pass validation`,
					errors: Object.entries(x.constraints).map(([, value]) => value),
				}))

				throw validationError(details)
			}
		}
	}
}
