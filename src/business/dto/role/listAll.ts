import { IRoleEntity } from '@domain/entities/roleEntity'
import { Either } from '@shared/either'

export type IOutputFindRoleBy = Either<void, IRoleEntity[]>
