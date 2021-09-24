import {
  IAdressEntity,
  IInputAdressEntity,
} from '@domain/entities/adressEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreateAdress = IInputAdressEntity

export type IOutputCreateAdress = Either<IError, IAdressEntity>
