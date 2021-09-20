import {
	IUserRepository,
	UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import { InputCreateUserEntity, IUserEntity } from '@domain/entities/userEntity'
import { injectable } from 'inversify'
import { fakeUserEntity } from '../entities/fakeUserEntity'

@injectable()
export class FakeUserRepository implements IUserRepository {
	async create(i: InputCreateUserEntity) {
		return {
			...i,
			id: 1,
			uuid: 'uuid-uuid-1234-uuid',
			created_at: new Date(),
			updated_at: new Date(),
		}
	}
	async findBy(
		t: UserEntityKeys,
		v: IUserEntity[UserEntityKeys]
	): Promise<IUserEntity | void> {
		const users: IUserEntity[] = [fakeUserEntity]

		const user = users.find((user) => user[t] === v)

		return user
	}
}
