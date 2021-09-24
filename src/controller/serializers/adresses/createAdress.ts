import { IInputCreateAdress } from '@business/dto/adress/create'
import { AbstractSerializer } from '@controller/serializers/abstractSerializer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class InputCreateAdress extends AbstractSerializer<IInputCreateAdress> {
  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  state: string

  @IsNumber()
  @IsNotEmpty()
  postal_code: number

  @IsString()
  @IsNotEmpty()
  country: string
}
