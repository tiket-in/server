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

	flightBooking: async (req, res) => {
		try {
			const {
				id_users,
				id_flight_schedule,
				contact_name,
				contact_num_phone,
			} = req.body

			const price = parseInt(req.body.price)
			const booked_status = 'Choose Payment Method'

			let data = {
				id_users,
				id_flight_schedule,
				contact_name,
				contact_num_phone,
				price,
				booked_status,
			}

			const result = await flightModel.flightBooking(data)

			res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Success Booking',
				data: {
					id: result.insertId,
					...data,
				},
			})
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
}
