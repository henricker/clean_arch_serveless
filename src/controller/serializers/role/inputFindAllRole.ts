import { IInputFindAllRole } from '@business/repositories/role/iRoleRepository'
import { IsNumber } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputFindAllRole extends AbstractSerializer<IInputFindAllRole> {
  @IsNumber()
  page: number

  @IsNumber()
  limit: number
}
