import { IRoleEntity } from '@domain/entities/roleEntity'
import { Either } from '@shared/either'

export type RoleEntityKeys = keyof Pick<IRoleEntity, 'id' | 'profile'>

export interface InputFindRoleBy {
	key: RoleEntityKeys
	value: IRoleEntity[RoleEntityKeys]
}

export type OutputFindRoleBy = Either<void, IRoleEntity>
