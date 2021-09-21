import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IInputSendMailDto {
  to: string
  subject: string
  payload: { [index: string]: string }
  templatePath: string
}

export type IOutputSendMailDto = Either<IError, void>
