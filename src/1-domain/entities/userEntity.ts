import { AbstractEntity } from '@root/src/1-domain/abstractEntity'
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
  forgot_password_token_expires_in?: Date
}

export type InputUserEntity = Pick<
  IUserEntity,
  'email' | 'full_name' | 'password'
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

    const user = new UserEntity({
      ...props,
      updated_at: currentDate,
    })

    return right(user)
  }
}
