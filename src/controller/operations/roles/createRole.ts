import { IOutputCreateRoleDto } from '@business/dto/role/create'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { CreateRoleUseCase } from '@business/useCases/role/createRoleUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
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
    @inject(CreateRoleUseCase) private createRoleUseCase: CreateRoleUseCase,
    @inject(FindRoleByUseCase) private findRoleByUseCase: FindRoleByUseCase
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

    const isAlreadyExistRole = await this.findRoleByUseCase.exec({
      key: 'profile',
      value: input.profile,
    })

    if (isAlreadyExistRole.isRight()) {
      return left(RolesErrors.roleAlreadyExists())
    }

    const roleResult = await this.createRoleUseCase.exec({
      profile: input.profile,
    })

    return roleResult
  }
}
