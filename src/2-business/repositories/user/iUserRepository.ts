import { IUserEntity } from '@root/src/1-domain/entities/userEntity'
import { IRelation } from '../relation'
import { IWhere } from '../where'

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken')

export type UserEntityKeys = keyof Omit<
  IUserEntity,
  'role' | 'password' | 'created_at' | 'updated_at'
>

export interface IInputUpdateUser {
  updateWhere: IWhere<UserEntityKeys, string | number>
  newData: Partial<IUserEntity>
}

export interface IUserRepository {
  create(
    inputUserEntity: Omit<IUserEntity, 'id' | 'role_id'>,
    role_id: number
  ): Promise<IUserEntity>
  findBy(
    type: UserEntityKeys,
    key: IUserEntity[UserEntityKeys],
    relations?: IRelation<string, UserEntityKeys>[]
  ): Promise<void | IUserEntity>
  update(input: IInputUpdateUser): Promise<Partial<IUserEntity> | void>
}
