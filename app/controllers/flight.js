const flightModel = require('../models/flights')
const HttpError = require('../../helpers/HttpError')

module.exports = {
	addFlight: async (req, res) => {
		try {
			const {
				id_flight_airline,
				flight_number,
				from_id_city,
				from_airport,
				from_airport_code,
				from_at,
				to_id_city,
				to_airport,
				to_airport_code,
				to_at,
			} = req.body

			const price = parseInt(req.body.price)
			const data = {
				id_flight_airline,
				flight_number,
				from_id_city,
				from_airport,
				from_airport_code,
				from_at,
				to_id_city,
				to_airport,
				to_airport_code,
				to_at,
				price,
			}

			const result = await flightModel.addFlight(data)

			res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Succes Add Schedule',
				data: {
					id: result.insertId,
					...data,
				},
			})
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
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
