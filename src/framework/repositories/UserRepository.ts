import { IRelation } from '@business/repositories/relation'
import {
  IInputUpdateUser,
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
      role_id,
    })

    return user as unknown as IUserEntity
  }
  async findBy(
    type: UserEntityKeys,
    key: IUserEntity[UserEntityKeys],
    relations?: IRelation<string, UserEntityKeys>[]
  ): Promise<void | IUserEntity> {
    try {
      const user = await this.userModel.findOne({
        where: { [type]: key },
        include:
          relations &&
          relations.map((relation) => ({
            association: relation.tableName,
          })),
      })

      const plainUser = user.get({ plain: true })

      return plainUser
    } catch {
      return void 0
    }
  }
  async update(input: IInputUpdateUser): Promise<IUserEntity | void> {
    await this.userModel.update(input.newData, {
      where: { [input.updateWhere.type]: input.updateWhere.key },
    })

    return input.newData
  }
}
