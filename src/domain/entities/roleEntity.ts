import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

export interface IRoleEntity extends ITimestamps {
  id: number
  profile: string
}

export type InputCreateRoleEntity = Pick<IRoleEntity, 'profile'>

type OutputCreateRoleEntity = Omit<IRoleEntity, 'id'>

export class RoleEntity extends AbstractEntity<OutputCreateRoleEntity> {
  static create(input: InputCreateRoleEntity): Right<void, RoleEntity> {
    const role = new RoleEntity({
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return right(role)
  }

  static update(input: IRoleEntity): Right<void, RoleEntity> {
    const role = new RoleEntity({
      ...input,
      updated_at: new Date(),
    })
    return right(role)
  }
}
