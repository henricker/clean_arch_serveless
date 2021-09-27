import { IRoleEntity } from '@root/src/1-domain/entities/roleEntity'

export const fakeRoleEntity: IRoleEntity = {
  id: 1,
  profile: 'admin',
  created_at: new Date('2021-09-21T10:00:00.000Z'),
  updated_at: new Date('2021-09-21T10:00:00.000Z'),
}

export const fakeRolesList: IRoleEntity[] = [
  {
    id: 1,
    profile: 'admin',
    created_at: new Date('2021-09-21T10:00:00.000Z'),
    updated_at: new Date('2021-09-21T10:00:00.000Z'),
  },
  {
    id: 2,
    profile: 'manager',
    created_at: new Date('2021-09-21T10:00:00.000Z'),
    updated_at: new Date('2021-09-21T10:00:00.000Z'),
  },
  {
    id: 3,
    profile: 'intern',
    created_at: new Date('2021-09-21T10:00:00.000Z'),
    updated_at: new Date('2021-09-21T10:00:00.000Z'),
  },
  {
    id: 4,
    profile: 'dev',
    created_at: new Date('2021-09-21T10:00:00.000Z'),
    updated_at: new Date('2021-09-21T10:00:00.000Z'),
  },
]
