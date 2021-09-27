import { AbstractEntity } from '@root/src/1-domain/abstractEntity'
import { ITimestamps } from '@root/src/1-domain/timestamps'
import { Right, right } from '@shared/either'

export interface IRoleEntity extends ITimestamps {
  id: number
  profile: string
}

export type InputCreateRoleEntity = Pick<IRoleEntity, 'profile'>

export class RoleEntity extends AbstractEntity<IRoleEntity> {
  static create(input: InputCreateRoleEntity): Right<void, RoleEntity> {
    const role = new RoleEntity({
      ...input,
      id: undefined,
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
