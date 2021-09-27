import { IsEmail, IsString, MinLength } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

interface IInputCreateAuthenticationDto {
  email: string
  password: string
}

export class InputCreateAuthentication extends AbstractSerializer<IInputCreateAuthenticationDto> {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string
}
