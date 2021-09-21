import type {
  IInputFindRoleBy,
  IOutputFindRoleBy,
} from '@business/dto/role/findBy'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
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

  async exec(props: IInputFindRoleBy): Promise<IOutputFindRoleBy> {
    const role = await this.roleRepository.findBy(props.key, props.value)

    if (!role) {
      return left(void 0)
    }

    return right(role)
  }
}
