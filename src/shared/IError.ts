interface IErrorBody {
  code: string
  message: string
  shortMessage: string
  [index: string]: unknown
}

export class IError {
  statusCode: number
  body: IErrorBody

  constructor({ statusCode, body }: { statusCode: number; body: IErrorBody }) {
    this.statusCode = statusCode
    this.body = body
  }
}
