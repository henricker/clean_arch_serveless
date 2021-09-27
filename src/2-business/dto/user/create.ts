import {
  InputUserEntity,
  IUserEntity,
} from '@root/src/1-domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export { InputUserEntity as InputCreateUserOperator }

export interface IInputCreateUserDto extends InputUserEntity {
  role_id: number
}

export type IOutputCreateUserDto = Either<IError, IUserEntity>
