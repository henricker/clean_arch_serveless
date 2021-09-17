import {
	IUserRepository,
	UserEntityKeys,
} from '@business/repositories/user/iUserRepository'
import { IUserEntity, IUserEntityRelations } from '@domain/entities/userEntity'
import { injectable } from 'inversify'
import { getRepository } from 'typeorm'
import { UserModel } from '../models/User'

@injectable()
export class UserRepository implements IUserRepository {
	async create(
		inputUserEntity: Omit<IUserEntity, 'id'>,
		role_id: number
	): Promise<IUserEntity> {
		const userRepository = getRepository(UserModel)

		const user = userRepository.create({ ...inputUserEntity, role_id })

		await userRepository.save(user)

		return user
	}

	async findBy(
		type: UserEntityKeys,
		key: IUserEntity[UserEntityKeys],
		relations?: (keyof IUserEntityRelations)[]
	): Promise<void | IUserEntity> {
		const userRepository = getRepository(UserModel)

		const user = await userRepository.findOne({
			where: { [type]: key },
			relations,
		})

		if (!user) {
			return void 0
		}

		return user
	}
}
