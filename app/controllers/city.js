const cityModel = require('../models/city')
const HttpError = require('../../helpers/HttpError')
const moment = require('moment')

module.exports = {
	getCity: async (req, res) => {
		try {
			const result = await cityModel.getCity()

			res.status(200).json({
				code: 200,
				staus: 'OK',
				result,
			})
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
	getCityByName: async (req, res) => {
		try {
			const result = await cityModel.getCityByName(req.query.name)
			res.json(result)
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
	addCity: async (req, res) => {
		try {
			const { name } = req.body
			const date = moment().format('YYYY-MM-DD HH:mm:ss')

			await cityModel.addCity({
				name,
				created_at: date,
				updated_at: date,
			})

			res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Succes add city',
				city: {
					name,
					created_at: date,
					updated_at: date,
				},
			})
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
}
