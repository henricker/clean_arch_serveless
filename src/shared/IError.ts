export class IError {
	statusCode: number
	body: string

	constructor({ statusCode, body }: { statusCode: number; body: string }) {
		this.statusCode = statusCode
		this.body = body
	}
}
