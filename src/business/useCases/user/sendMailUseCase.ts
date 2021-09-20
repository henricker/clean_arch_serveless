import {
  InputSendMailDto,
  OutputSendMailDto,
} from '@business/dto/user/sendMail'
import { UsersErrors } from '@business/module/errors/users/usersErrors'
import { IMailService, IMailServiceToken } from '@business/services/mail/iMail'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractUseCase } from '../abstractUseCase'

@injectable()
export class SendMailUseCase
  implements AbstractUseCase<InputSendMailDto, OutputSendMailDto>
{
  constructor(@inject(IMailServiceToken) private mailService: IMailService) {}

  async exec(input: InputSendMailDto): Promise<OutputSendMailDto> {
    try {
      await this.mailService.send(input)

      return right(void 0)
    } catch (error) {
      console.error(error)
      return left(UsersErrors.userEmailNotSent())
    }
  }
}
