import { IInputCreateRoleDto } from '@business/dto/role/create'
import { IsString, MinLength } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateRole extends AbstractSerializer<IInputCreateRoleDto> {
  @IsString()
  @MinLength(3)
  profile: string
}
