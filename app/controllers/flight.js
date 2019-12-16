const flightModel = require('../models/flights')
const HttpError = require('../../helpers/HttpError')

module.exports = {
	getFlight: async (req, res) => {
		try {
			const { from_city, to_city, from_date } = req.query

			const result = await flightModel.getFlight(from_city, to_city, from_date)

			if (result.length <= 0) {
				throw new HttpError(404, 'Not Found', 'Flight Not Found')
			}

			res.status(200).json({
				code: 200,
				status: 'OK',
				total: result.length,
				result,
			})
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
}
