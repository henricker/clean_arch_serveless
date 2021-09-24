import { IInputCreateUserDto } from '@business/dto/user/create'
import { InputUserEntity, IUserEntity } from '@domain/entities/userEntity'

export const fakeCreatedUserEntity: InputUserEntity = {
  full_name: 'João Pedro',
  email: 'pedrobarros2010@gmail.com',
  password: 'fake_password',
}

export const fakeNewUser: IInputCreateUserDto = {
  email: 'fake@email',
  full_name: 'fake full name',
  password: 'fake_password',
  role_id: 0,
}

export const fakeUserEntity: Required<IUserEntity> = {
  ...fakeCreatedUserEntity,
  id: 1,
  role_id: 1,
  forgot_password_token: '',
  forgot_password_token_expires_in: undefined,
  uuid: '7b1f3001-6a4b-4bdd-90e9-8a280fff017d',
  role: {
    id: 1,
    profile: 'manager',
    created_at: new Date(),
    updated_at: new Date(),
  },
  created_at: new Date(),
  updated_at: new Date(),
}

export const fakeUserAdminEntity: Required<IUserEntity> = {
  ...fakeUserEntity,
  id: 2,
  uuid: 'f9116615-36a4-4b67-80c1-dc208ba86ae1',
  role: {
    ...fakeUserEntity.role,
    profile: 'admin',
  },
}
