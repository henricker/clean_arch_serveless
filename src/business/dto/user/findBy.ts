import { UserEntityKeys } from '@business/repositories/user/iUserRepository'
import { Either } from '@shared/either'
import { IUserEntity } from '@domain/entities/userEntity'

export interface InputFindUserByDto {
	key: UserEntityKeys
	value: number | string
}

export type OutputFindUserByDto = Either<void, IUserEntity>
