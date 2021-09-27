import { IOutputFindAllRoles } from '@root/src/2-business/dto/role/findAll'
import { FindAllRolesUseCase } from '@root/src/2-business/useCases/role/findAllRolesUseCase'
import { VerifyProfileUseCase } from '@root/src/2-business/useCases/role/verifyProfileUseCase'
import { InputFindAllRole } from '@root/src/3-controller/serializers/role/inputFindAllRole'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class FindAllRolesOperator extends AbstractOperator<
  InputFindAllRole,
  IOutputFindAllRoles
> {
  constructor(
    @inject(VerifyProfileUseCase)
    private verifyProfileUseCase: VerifyProfileUseCase,
    @inject(FindAllRolesUseCase)
    private findAllRolesUseCase: FindAllRolesUseCase
  ) {
    super()
  }

  async run(
    input: InputFindAllRole,
    userId: number
  ): Promise<IOutputFindAllRoles> {
    await this.exec(input)
    const authUser = await this.verifyProfileUseCase.exec({
      authorizeBy: 'id',
      key: userId,
      allowedProfiles: [],
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const roles = await this.findAllRolesUseCase.exec(input)

    if (roles.isLeft()) {
      return left(roles.value)
    }

    return right(roles.value)
  }
}
