import { IRoleEntity } from '@domain/entities/roleEntity'

export const fakeCreateRoleEntity: IRoleEntity = {
  id: 1,
  profile: 'admin',
  created_at: new Date(),
  updated_at: new Date(),
}
