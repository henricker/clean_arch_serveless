import { IsNotEmpty, IsString, MinLength } from 'class-validator'
import { injectable } from 'inversify'
import { AbstractSerializer } from '../abstractSerializer'

@injectable()
export class InputDeleteAdress extends AbstractSerializer<{ uuid: string }> {
  @IsString()
  @IsNotEmpty()
  @MinLength(36)
  uuid: string
}
