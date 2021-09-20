import { IUserEntity } from '@domain/entities/userEntity'
import { Relation } from '../relation'

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken')

export type UserEntityKeys = keyof Omit<
  IUserEntity,
  'role' | 'password' | 'created_at' | 'updated_at'
>

export interface InputUpdateUser {
  updateWhere: { type: UserEntityKeys; key: string | number }
  newData: { [index in keyof Partial<IUserEntity>]: string | number }
}

export interface IUserRepository {
  create(
    inputUserEntity: Omit<IUserEntity, 'id' | 'role_id'>,
    role_id: number
  ): Promise<IUserEntity>
  findBy(
    type: UserEntityKeys,
    key: IUserEntity[UserEntityKeys],
    relations?: Relation<string, UserEntityKeys>[]
  ): Promise<void | IUserEntity>
  update(input: InputUpdateUser): Promise<IUserEntity | void>
}
