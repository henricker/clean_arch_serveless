import type {
  IInputFindRoleBy,
  IOutputFindRoleBy,
} from '@root/src/2-business/dto/role/findBy'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@root/src/2-business/repositories/role/iRoleRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindRoleByUseCase
  implements IAbstractUseCase<IInputFindRoleBy, IOutputFindRoleBy>
{
  constructor(
    @inject(IRoleRepositoryToken) private roleRepository: IRoleRepository
  ) {}

  async exec(input: IInputFindRoleBy): Promise<IOutputFindRoleBy> {
    const role = await this.roleRepository.findBy(input.key, input.value)

    if (!role) {
      return left(void 0)
    }

    return right(role)
  }
}
