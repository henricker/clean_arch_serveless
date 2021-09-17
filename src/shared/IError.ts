export class IError {
	statusCode: number
	body: unknown

	constructor({ statusCode, body }: { statusCode: number; body: unknown }) {
		this.statusCode = statusCode
		this.body = body
	}
}
