class HttpError extends Error {
	constructor(code, status, message) {
		super(JSON.stringify({ code, status, message }))
		Error.captureStackTrace(this, this.constructor)
	}

	static handle(res, err) {
		if (err instanceof this) {
			const error = JSON.parse(err.message)
			console.error(error)
			return res.status(error.code).send(error)
		}

		console.error(err)

		res.status(500).send({
			code: 500,
			status: 'Internal Server Error!',
			message: 'An error occured on the server',
			error: true,
		})
	}
}

module.exports = HttpError
