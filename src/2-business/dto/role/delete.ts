import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IInputDeleteRoleDto {
  id: number
}

export type IOutputDeleteRoleDto = Either<IError, IRoleEntity>
