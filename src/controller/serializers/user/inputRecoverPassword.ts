import { IsEmail, IsString, IsUrl } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export interface RecoverPassword {
  userEmail: string
  redirectUrl: string
}

export class InputRecoverPassword extends AbstractSerializer<RecoverPassword> {
  @IsEmail()
  userEmail: string

  @IsString()
  @IsUrl()
  redirectUrl: string
}
