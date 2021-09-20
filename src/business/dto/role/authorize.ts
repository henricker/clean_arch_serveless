import { UserEntityKeys } from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface InputAuthorizeUseCase {
  authorizeBy: UserEntityKeys
  key: string | number
  allowedProfiles: string[]
  lastChance?: (user: Required<IUserEntity>) => boolean
}

export type OutputAuthorizeUseCase = Either<IError, Required<IUserEntity>>
