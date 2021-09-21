import { IsString, MinLength } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export interface IInputShowUserProps {
  user_uuid: string
  current_logged_user_id: number
}

export class InputShowUser extends AbstractSerializer<IInputShowUserProps> {
  @IsString()
  @MinLength(36)
  user_uuid: string
}
