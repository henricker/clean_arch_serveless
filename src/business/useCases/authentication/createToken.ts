import type {
	InputAuthenticateUseCase,
	OutputAuthenticateUseCase,
} from '@business/dto/authentication/authenticate'
import {
	IAuthenticatorService,
	IAuthenticatorServiceToken,
} from '@business/services/authenticator/iAuthenticator'
import { right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateTokenUseCase
	implements
		AbstractUseCase<InputAuthenticateUseCase, OutputAuthenticateUseCase>
{
	constructor(
		@inject(IAuthenticatorServiceToken)
		private authenticatorService: IAuthenticatorService
	) {}

	async exec(
		input: InputAuthenticateUseCase
	): Promise<OutputAuthenticateUseCase> {
		const token = await this.authenticatorService.sing(input.payload)

		return right({ token })
	}
}
