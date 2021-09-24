import { IError } from '@shared/IError'

export const IAuthenticatorServiceToken = Symbol.for(
  'IAuthenticatorServiceToken'
)

export interface ITokenVerifyFormat {
  [index: string]: number | string
}

export interface IAuthenticatorService {
  sign(payload: { [k: string]: string | number | boolean }): Promise<string>
  verify(token: string): Promise<ITokenVerifyFormat | IError>
}
