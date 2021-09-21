import { AbstractEntity } from '@domain/abstractEntity'
import { Right, right } from '@shared/either'
import { ITimestamps } from '../timestamps'
import { IRoleEntity } from './roleEntity'

export interface IUserEntityRelations {
  role: IRoleEntity
}

export interface IUserEntity
  extends ITimestamps,
    Partial<IUserEntityRelations> {
  id: number
  uuid: string
  role_id: number
  full_name: string
  email: string
  password: string
  forgot_password_token?: string
}

export type InputUserEntity = Pick<
  IUserEntity,
  'email' | 'full_name' | 'password'
>

export type OutputCreateUserEntity = Omit<
  IUserEntity,
  'id' | 'uuid' | 'role_id'
>

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: InputUserEntity): Right<void, UserEntity> {
    const currentDate = new Date()

    const user = new UserEntity({
      ...props,
      id: undefined,
      role_id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
    })

    return right(user)
  }

  static update(props: IUserEntity): Right<void, UserEntity> {
    const currentDate = new Date()

    console.log(props)

    const user = new UserEntity({
      ...props,
      updated_at: currentDate,
    })

    return right(user)
  }
}
