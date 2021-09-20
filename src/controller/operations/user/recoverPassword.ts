import { OutputSendMailDto } from '@business/dto/user/sendMail'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { FindUserByUseCase } from '@business/useCases/user/findUserByUseCase'
import { SendMailUseCase } from '@business/useCases/user/sendMailUseCase'
import { UpdateUserUseCase } from '@business/useCases/user/updateUserUseCase'
import { InputRecoverPassword } from '@controller/serializers/user/inputRecoverPassword'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class RecoverPasswordOperator extends AbstractOperator<
  InputRecoverPassword,
  OutputSendMailDto
> {
  constructor(
    @inject(FindUserByUseCase) private findUserByUseCase: FindUserByUseCase,
    @inject(SendMailUseCase) private sendMailuseCase: SendMailUseCase,
    @inject(UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {
    super()
  }

  async run(input: InputRecoverPassword): Promise<OutputSendMailDto> {
    await this.exec(input)

    const userExists = await this.findUserByUseCase.exec({
      key: 'email',
      value: input.userEmail,
    })

    if (userExists.isLeft()) {
      return left(userExists.value)
    }

    const forgot_password_token = this.uniqueIdentifier.create()

    await this.updateUserUseCase.exec({
      newData: { forgot_password_token },
      updateWhere: { type: 'id', key: userExists.value.id },
    })

    const formatedRedirectURL = input.redirectUrl.endsWith('/')
      ? input.redirectUrl
      : input.redirectUrl + '/'

    return this.sendMailuseCase.exec({
      to: input.userEmail,
      subject: 'Password recover',
      payload: {
        full_name: userExists.value.full_name,
        redirectUrl: `${formatedRedirectURL}${forgot_password_token}`,
      },
      templatePath: 'recover_pass',
    })
  }
}
