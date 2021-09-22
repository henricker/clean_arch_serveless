import { IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type InputUpdateUserDto = IUserEntity

export type OutputUpdateUserDto = Either<IError, IUserEntity>
