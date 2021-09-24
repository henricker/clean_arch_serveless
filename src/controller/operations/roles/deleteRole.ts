import { IOutputDeleteRoleDto } from '@business/dto/role/delete'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'
import { DeleteRoleUseCase } from '@business/useCases/role/deleteRoleUseCase'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfileUseCase'
import { InputDeleteRole } from '@controller/serializers/role/inputDeleteRole'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class DeleteRoleOperator extends AbstractOperator<
  InputDeleteRole,
  IOutputDeleteRoleDto
> {
  constructor(
    @inject(VerifyProfileUseCase)
    private verifyProfileUseCase: VerifyProfileUseCase,
    @inject(FindRoleByUseCase) private findRoleByUseCase: FindRoleByUseCase,
    @inject(DeleteRoleUseCase) private deleteRoleUseCase: DeleteRoleUseCase
  ) {
    super()
  }

  async run(
    input: InputDeleteRole,
    user_id: number
  ): Promise<IOutputDeleteRoleDto> {
    await this.exec(input)
    const authUser = await this.verifyProfileUseCase.exec({
      authorizeBy: 'id',
      key: user_id,
      allowedProfiles: [],
    })
    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const roleForDeletion = await this.findRoleByUseCase.exec({
      key: 'id',
      value: input.id,
    })

    if (roleForDeletion.isLeft()) {
      return left(RolesErrors.roleNotFound())
    }

    const roleResult = await this.deleteRoleUseCase.exec({
      key: 'id',
      value: roleForDeletion.value.id,
    })

    if (roleResult.isLeft()) {
      return left(roleResult.value)
    }

    return right(roleResult.value)
  }
}
