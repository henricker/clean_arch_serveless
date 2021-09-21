import { InputUserEntity, IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export { InputUserEntity as InputCreateUserOperator }

export interface IInputCreateUserDto extends InputUserEntity {
  role_id: number
}

export type IOutputCreateUserDto = Either<IError, IUserEntity>
