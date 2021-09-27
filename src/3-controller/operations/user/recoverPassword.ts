import { IOutputSendMailDto } from '@root/src/2-business/dto/user/sendMail'
import {
  ITimeService,
  ITimeServiceToken,
} from '@root/src/2-business/services/time/iTime'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@root/src/2-business/services/uniqueIdentifier/iUniqueIdentifier'
import { FindUserByUseCase } from '@root/src/2-business/useCases/user/findUserByUseCase'
import { SendMailUseCase } from '@root/src/2-business/useCases/user/sendMailUseCase'
import { UpdateUserUseCase } from '@root/src/2-business/useCases/user/updateUserUseCase'
import { InputRecoverPassword } from '@root/src/3-controller/serializers/user/inputRecoverPassword'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class RecoverPasswordOperator extends AbstractOperator<
  InputRecoverPassword,
  IOutputSendMailDto
> {
  constructor(
    @inject(FindUserByUseCase) private findUserByUseCase: FindUserByUseCase,
    @inject(SendMailUseCase) private sendMailuseCase: SendMailUseCase,
    @inject(UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService,
    @inject(ITimeServiceToken) private timeService: ITimeService
  ) {
    super()
  }

  async run(input: InputRecoverPassword): Promise<IOutputSendMailDto> {
    this.exec(input)

    const userExists = await this.findUserByUseCase.exec({
      key: 'email',
      value: input.userEmail,
    })

    if (userExists.isLeft()) {
      return left(userExists.value)
    }

    const forgot_password_token = this.uniqueIdentifier.create()

    const forgot_password_token_expires_in = this.timeService.add(
      this.timeService.toMilliseconds('2h')
    )

    const userIsUpdated = await this.updateUserUseCase.exec(
      {
        forgot_password_token,
        forgot_password_token_expires_in,
      },
      { column: 'id', value: userExists.value.id }
    )

    if (userIsUpdated.isLeft()) {
      return left(userIsUpdated.value)
    }

    const formatedRedirectURL = input.redirectUrl.endsWith('/')
      ? input.redirectUrl
      : `${input.redirectUrl}/`

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
