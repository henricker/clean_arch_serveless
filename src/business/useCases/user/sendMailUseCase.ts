import {
  IInputSendMailDto,
  IOutputSendMailDto,
} from '@business/dto/user/sendMail'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IMailService, IMailServiceToken } from '@business/services/mail/iMail'
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
      console.error(error)
      return left(UsersErrors.userEmailNotSent())
    }
  }
}
