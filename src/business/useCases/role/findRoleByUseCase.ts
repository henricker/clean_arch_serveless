import { InputFindRoleBy, OutputFindRoleBy } from '@business/dto/role/findBy'
import {
	IRoleRepository,
	IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindRoleByUseCase
	implements AbstractUseCase<InputFindRoleBy, OutputFindRoleBy>
{
	constructor(
		@inject(IRoleRepositoryToken) private roleRepository: IRoleRepository
	) {}

	async exec(props: InputFindRoleBy): Promise<OutputFindRoleBy> {
		const role = await this.roleRepository.findBy(props.key, props.value)

		if (!role) {
			return left(void 0)
		}

		return right(role)
	}
}
