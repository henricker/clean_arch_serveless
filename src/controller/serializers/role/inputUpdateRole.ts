import { InputUpdateRoleDto } from '@business/dto/role/update'
import { IsNumber, IsString, MinLength } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputUpdateRole extends AbstractSerializer<InputUpdateRoleDto> {
  @IsNumber()
  id: number

  @IsString()
  @MinLength(3)
  profile: string
}
