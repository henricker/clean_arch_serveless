import { IInputUpdateAdress } from '@business/dto/adress/update'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputUpdateAdress extends AbstractSerializer<IInputUpdateAdress> {
  @IsString()
  @IsOptional()
  street: string

  @IsString()
  @IsOptional()
  city: string

  @IsString()
  @IsOptional()
  state: string

  @IsNumber({ allowNaN: true })
  @IsOptional()
  postal_code: number

  @IsString()
  @IsOptional()
  country: string
}
