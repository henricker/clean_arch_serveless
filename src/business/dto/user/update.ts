import { IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { InputUpdateUser } from '@business/repositories/user/iUserRepository'

export type InputUpdateUserDto = InputUpdateUser

export type OutputUpdateUserDto = Either<IError, IUserEntity>
