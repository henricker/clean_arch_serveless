import { InputCreateUserEntity, IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type InputCreateUserOperator = InputCreateUserEntity

export interface InputCreateUserDto extends InputCreateUserEntity {
	role_id: number
}

export type OutputCreateUserDto = Either<IError, IUserEntity>
