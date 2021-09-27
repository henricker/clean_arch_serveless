import { IUserEntity } from '@root/src/1-domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type InputUpdateUserDto = Partial<IUserEntity>

export type IOutputUpdateUserDto = Either<IError, IUserEntity>
