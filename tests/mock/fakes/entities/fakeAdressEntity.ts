import {
  IAdressEntity,
  IInputAdressEntity,
} from '@domain/entities/adressEntity'

export const fakeCreateAdressEntity: IInputAdressEntity = {
  city: 'Iporá',
  street: 'Rua dos bobos, 0',
  state: 'Goiás',
  country: 'Brazil',
  postal_code: 76200000,
}

export const fakeAdressEntity: IAdressEntity = {
  ...fakeCreateAdressEntity,
  id: 1,
  uuid: '76e8e96d-1677-42dd-a84e-979dd5b26f7d',
  created_at: new Date(),
  updated_at: new Date(),
}
