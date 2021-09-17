import {
	IUserRepository,
	UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import { InputCreateUserEntity, IUserEntity } from '@domain/entities/userEntity'
import { injectable } from 'inversify'

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
		_t: UserEntityKeys,
		_v: IUserEntity[UserEntityKeys]
	): Promise<IUserEntity | void> {
		return void 0
	}
}
