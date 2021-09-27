import { IAdressEntity } from '@domain/entities/adressEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputUpdateAdress = Partial<IAdressEntity>

export type IOutputUpdateAdress = Either<IError, IInputUpdateAdress>
