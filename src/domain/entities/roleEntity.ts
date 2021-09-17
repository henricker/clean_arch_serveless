import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Either, right } from '@shared/either'
import { IError } from '@shared/IError'

export interface IRoleEntity extends ITimestamps {
	id: number
	profile: string
}

type InputCreateRoleEntity = Pick<IRoleEntity, 'profile'>

type OutputCreateRoleEntity = Omit<IRoleEntity, 'id'>

export class RoleEntity extends AbstractEntity<OutputCreateRoleEntity> {
	static create(input: InputCreateRoleEntity): Either<IError, RoleEntity> {
		const role = new RoleEntity({
			...input,
			created_at: new Date(),
			updated_at: new Date(),
		})

		return right(role)
	}
}
