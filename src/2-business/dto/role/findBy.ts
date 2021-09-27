import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'
import { Either } from '@shared/either'

export type RoleEntityKeys = keyof Pick<IRoleEntity, 'id' | 'profile'>

export interface IInputFindRoleBy {
  column: RoleEntityKeys
  value: IRoleEntity[RoleEntityKeys]
}

export type IOutputFindRoleBy = Either<void, IRoleEntity>
