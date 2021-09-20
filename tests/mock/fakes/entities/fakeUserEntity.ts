import { InputCreateUserEntity, IUserEntity } from '@domain/entities/userEntity'

export const fakeCreatedUserEntity: InputCreateUserEntity = {
	full_name: 'João Pedro',
	email: 'pedrobarros2010@gmail.com',
	password: 'fake_password',
}

export const fakeUserEntity: Required<IUserEntity> = {
	...fakeCreatedUserEntity,
	id: 1,
	uuid: 'fake-uuid-128-bits',
	role: {
		id: 1,
		profile: 'manager',
		created_at: new Date(),
		updated_at: new Date(),
	},
	created_at: new Date(),
	updated_at: new Date(),
}
