import { IMailService } from '@business/services/mail/iMail'
import { injectable } from 'inversify'
import { InputSendMailDto } from '@business/dto/user/sendMail'

@injectable()
export class FakeMailRepository implements IMailService {
  async send(_input: InputSendMailDto): Promise<void> {
  }
}
