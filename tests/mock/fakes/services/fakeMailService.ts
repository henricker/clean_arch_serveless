import { IMailService } from '@root/src/2-business/services/mail/iMail'
import { injectable } from 'inversify'
import { IInputSendMailDto } from '@root/src/2-business/dto/user/sendMail'

@injectable()
export class FakeMailService implements IMailService {
  async send(_input: IInputSendMailDto): Promise<void> {
    return void 0
  }
}
