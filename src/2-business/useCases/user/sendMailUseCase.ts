import {
  IInputSendMailDto,
  IOutputSendMailDto,
} from '@root/src/2-business/dto/user/sendMail'
import { UsersErrors } from '@root/src/2-business/module/errors/users/usersErrors'
import {
  IMailService,
  IMailServiceToken,
} from '@root/src/2-business/services/mail/iMail'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class SendMailUseCase
  implements IAbstractUseCase<IInputSendMailDto, IOutputSendMailDto>
{
  constructor(@inject(IMailServiceToken) private mailService: IMailService) {}

  async exec(input: IInputSendMailDto): Promise<IOutputSendMailDto> {
    try {
      await this.mailService.send(input)

      return right(void 0)
    } catch (error) {
      return left(UsersErrors.userEmailNotSent())
    }
  }
}
