import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface InputAuthenticateUseCase {
	payload: { [index: string]: string | number }
}

export type OutputAuthenticateUseCase = Either<
	IError,
	{
		token: string
	}
>
