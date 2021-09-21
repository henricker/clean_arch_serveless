import { IRoleEntity } from '@domain/entities/roleEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IInputCreateRoleDto {
  profile: string
}

export type OutputCreateRoleDto = Either<IError, IRoleEntity>
