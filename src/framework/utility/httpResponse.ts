const types = {
	ok: {
		statusCode: 200,
	},
	created: {
		statusCode: 201,
	},
	badRequest: {
		statusCode: 400,
	},
	notFound: {
		statusCode: 404,
	},
	internalError: {
		statusCode: 500,
	},
}

export const httpResponse = (
	responseType: keyof typeof types | number,
	body: unknown
) => ({
	statusCode: types[responseType]?.statusCode || responseType,
	body: body,
})
