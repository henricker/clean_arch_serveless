import { IMailService } from '@business/services/mail/iMail'
import { injectable } from 'inversify'
import { IInputSendMailDto } from '@business/dto/user/sendMail'

@injectable()
export class FakeMailRepository implements IMailService {
  async send(_input: IInputSendMailDto): Promise<void> {
    return void 0
  }
}
