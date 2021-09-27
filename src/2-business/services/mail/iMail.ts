import { IInputSendMailDto } from '@root/src/2-business/dto/user/sendMail'

export const IMailServiceToken = Symbol.for('IMailServiceToken')

export interface IMailService {
  send(input: IInputSendMailDto): Promise<void>
}
