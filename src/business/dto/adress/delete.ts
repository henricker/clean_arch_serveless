import { IAdressEntity } from '@domain/entities/adressEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputDeleteAdress = Pick<IAdressEntity, 'uuid'>

export type IOutputDeleteAdress = Either<IError, void>
