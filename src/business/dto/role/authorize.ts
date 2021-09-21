import { UserEntityKeys } from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IInputAuthorizeUseCase {
  authorizeBy: UserEntityKeys
  key: string | number
  allowedProfiles: string[]
  lastChance?: (user: Required<IUserEntity>) => Promise<boolean>
}

export type IOutputAuthorizeUseCase = Either<IError, Required<IUserEntity>>
