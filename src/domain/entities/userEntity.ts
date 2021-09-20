import { AbstractEntity } from '@domain/abstractEntity'
import { Either, right } from '@shared/either'
import { IError } from '@shared/IError'
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

export type InputCreateUserEntity = Pick<
  IUserEntity,
  'email' | 'full_name' | 'password'
>

export type OutputCreateUserEntity = Omit<
  IUserEntity,
  'id' | 'uuid' | 'role_id'
>

export class UserEntity extends AbstractEntity<OutputCreateUserEntity> {
  static create(props: InputCreateUserEntity): Either<IError, UserEntity> {
    const currentDate = new Date()

    const user = new UserEntity({
      ...props,
      created_at: currentDate,
      updated_at: currentDate,
    })

    return right(user)
  }
}
