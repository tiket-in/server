const { verify } = require('jsonwebtoken')
const HttpError = require('../../helpers/HttpError')

const verifyToken = (req, res, next) => {
	try {
		const bearerHeader = req.headers['authorization']

		if (typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split(' ')

			const bearerToken = bearer[1]
			req.token = bearerToken
			next()
		} else {
			throw new HttpError(403, 'Forbidden', "You're not authorized ")
		}
	} catch (error) {
		HttpError.handle(res, error)
	}
}

const verifyUser = (req, res, next) => {
	const token = req.token
	try {
		verify(token, process.env.JWT_SECRET)
		next()
	} catch (error) {
		res.sendStatus(405)
	}
}

module.exports = { verifyToken, verifyUser }
