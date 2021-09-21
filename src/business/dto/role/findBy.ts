import { IRoleEntity } from '@domain/entities/roleEntity'
import { Either } from '@shared/either'

export type RoleEntityKeys = keyof Pick<IRoleEntity, 'id' | 'profile'>

export interface IInputFindRoleBy {
  key: RoleEntityKeys
  value: IRoleEntity[RoleEntityKeys]
}

export type IOutputFindRoleBy = Either<void, IRoleEntity>
