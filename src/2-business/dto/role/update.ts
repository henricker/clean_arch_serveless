import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type InputUpdateRoleDto = IRoleEntity

export type OutputUpdateRoleDto = Either<IError, IRoleEntity>
