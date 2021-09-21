import { IInputSendMailDto } from '@business/dto/user/sendMail'

export const IMailServiceToken = Symbol.for('IMailServiceToken')

export interface IMailService {
  send(input: IInputSendMailDto): Promise<void>
}
