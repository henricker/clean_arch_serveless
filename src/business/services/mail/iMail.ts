import { InputSendMailDto } from '@business/dto/user/sendMail'

export const IMailServiceToken = Symbol.for('IMailServiceToken')

export interface IMailService {
  send(input: InputSendMailDto): Promise<void>
}
