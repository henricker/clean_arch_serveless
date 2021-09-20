import { Relation } from '@business/repositories/relation'
import {
  InputUpdateUser,
  IUserRepository,
  UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/userEntity'
import { UserModel } from '@framework/models/users/userModel'
import { inject, injectable } from 'inversify'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async create(
    inputUserEntity: Omit<IUserEntity, 'id'>,
    role_id: number
  ): Promise<IUserEntity> {
    const user = await this.userModel.create({
      ...inputUserEntity,
      role_id: role_id,
    })

    return user
  }
  async findBy(
    type: UserEntityKeys,
    key: IUserEntity[UserEntityKeys],
    relations?: Relation<string, UserEntityKeys>[]
  ): Promise<void | IUserEntity> {
    const user = await this.userModel.findOne({
      where: { [type]: key },
      include:
        relations &&
        relations.map((relation) => ({
          association: relation.tableName,
        })),
    })

    return user
  }
  async update(input: InputUpdateUser): Promise<IUserEntity | void> {
    const user = await this.userModel.update(input.newData, {
      where: { id: input.user.id },
    })
    return user[1][0]
  }
}
