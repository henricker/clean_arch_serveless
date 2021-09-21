import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IInputAuthenticateUseCase {
  payload: { [index: string]: string | number }
}

export type IOutputAuthenticateUseCase = Either<
  IError,
  {
    token: string
  }
>
