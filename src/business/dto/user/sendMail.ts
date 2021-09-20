import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface InputSendMailDto {
  to: string
  subject: string
  payload: { [index: string]: string }
  templatePath: string
}

export type OutputSendMailDto = Either<IError, void>
