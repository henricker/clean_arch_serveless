import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IInputCreateRoleDto {
  profile: string
}

export type IOutputCreateRoleDto = Either<IError, IRoleEntity>
