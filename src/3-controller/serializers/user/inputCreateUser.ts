import { InputCreateUserOperator } from '@root/src/2-business/dto/user/create'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateUser extends AbstractSerializer<InputCreateUserOperator> {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(2)
  full_name: string

  @IsString()
  @MinLength(8)
  password: string
}
