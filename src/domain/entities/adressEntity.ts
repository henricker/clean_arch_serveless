import { AbstractEntity } from '@domain/abstractEntity'
import { ISoftDelete } from '@domain/softDelete'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export interface IAdressEntity extends ITimestamps, ISoftDelete {
  id: number
  uuid: string
  street: string
  city: string
  state: string
  postal_code: number
  country: string
}

export type IInputAdressEntity = Omit<
  IAdressEntity,
  'id' | 'uuid' | 'created_at' | 'updated_at' | 'deleted_at'
>

export class AdressEntity extends AbstractEntity<IAdressEntity> {
  static create(prop: IInputAdressEntity): Right<void, AdressEntity> {
    const currentDate = new Date()

    const adressEntity = new AdressEntity({
      ...prop,
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      deleted_at: null,
    })

    return right(adressEntity)
  }
}
