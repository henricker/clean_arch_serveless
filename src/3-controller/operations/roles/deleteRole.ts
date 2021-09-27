import { IOutputDeleteRoleDto } from '@root/src/2-business/dto/role/delete'
import { RolesErrors } from '@root/src/2-business/module/errors/roles/rolesErrors'
import { DeleteRoleUseCase } from '@root/src/2-business/useCases/role/deleteRoleUseCase'
import { FindRoleByUseCase } from '@root/src/2-business/useCases/role/findRoleByUseCase'
import { VerifyProfileUseCase } from '@root/src/2-business/useCases/role/verifyProfileUseCase'
import { InputDeleteRole } from '@root/src/3-controller/serializers/role/inputDeleteRole'
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
    userId: number
  ): Promise<IOutputDeleteRoleDto> {
    await this.exec(input)
    const authUser = await this.verifyProfileUseCase.exec({
      authorizeBy: 'id',
      key: userId,
      allowedProfiles: [],
    })
    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const roleForDeletion = await this.findRoleByUseCase.exec({
      column: 'id',
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
