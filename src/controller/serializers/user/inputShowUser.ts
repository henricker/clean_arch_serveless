import { IsNumber, Min } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export interface InputShowUserProps {
	user_uuid: string
	current_logged_user_id: number
}

export class InputShowUser extends AbstractSerializer<InputShowUserProps> {
	@IsNumber()
	@Min(0)
	user_uuid: string

	@IsNumber()
	@Min(0)
	current_logged_user_id: number
}
