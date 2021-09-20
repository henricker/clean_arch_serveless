import { AbstractOperator } from '../abstractOperator'
import { OutputCreateUserDto } from '@business/dto/user/create'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { FindRoleByUseCase } from '@business/useCases/role/findRoleByUseCase'
import { RolesErrors } from '@business/module/errors/roles/rolesErrors'

@injectable()
export class CreateUserOperator extends AbstractOperator<
  InputCreateUser,
  OutputCreateUserDto
> {
  constructor(
    @inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(FindUserByUseCase) private findUserUseCase: FindUserByUseCase,
    @inject(FindRoleByUseCase) private findRoleUseCase: FindRoleByUseCase
  ) {
    super()
  }

  async run(input: InputCreateUser): Promise<OutputCreateUserDto> {
    await this.exec(input)

    const isUserAlreadyRegistered = await this.findUserUseCase.exec({
      key: 'email',
      value: input.email,
    })

    if (isUserAlreadyRegistered.isRight()) {
      return left(UsersErrors.userEmailAlreadyInUse())
    }

    const role = await this.findRoleUseCase.exec({
      key: 'profile',
      value: 'manager',
    })

    if (role.isLeft()) {
      return left(RolesErrors.roleNotFound())
    }

    const userResult = await this.createUserUseCase.exec({
      ...input,
      role_id: role.value.id,
    })

    if (userResult.isLeft()) {
      return left(userResult.value)
    }

    return right(userResult.value)
  }
}
