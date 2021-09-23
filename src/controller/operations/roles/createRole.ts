import { IOutputCreateRoleDto } from '@business/dto/role/create'
import { CreateRoleUseCase } from '@business/useCases/role/createRoleUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { InputCreateRole } from '@controller/serializers/role/inputCreateRole'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateRoleOperator extends AbstractOperator<
  InputCreateRole,
  IOutputCreateRoleDto
> {
  constructor(
    @inject(VerifyProfileUseCase)
    private verifyProfileUseCase: VerifyProfileUseCase,
    @inject(CreateRoleUseCase) private createRoleUseCase: CreateRoleUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateRole,
    userId: number
  ): Promise<IOutputCreateRoleDto> {
    this.exec(input)
    const authUser = await this.verifyProfileUseCase.exec({
      authorizeBy: 'id',
      key: userId,
      allowedProfiles: [],
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const roleResult = await this.createRoleUseCase.exec({
      profile: input.profile,
    })

    return roleResult
  }
}
