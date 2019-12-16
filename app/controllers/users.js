const userModel = require('../models/users')
const { validateLoginInput } = require('../../helpers/validators/users')
const HttpError = require('../../helpers/HttpError')
const { genSalt, hash } = require('bcryptjs')
const uuid = require('uuid/v4')
const moment = require('moment')

module.exports = {
	register: async (req, res) => {
		try {
			const { email, first_name, last_name, password, num_phone } = req.body
			const data = { email, first_name, last_name, password, num_phone }

			const { errors, isValid } = validateLoginInput(data)
			if (!isValid) {
				throw new HttpError(400, 'Bad Request', errors)
			}

			const checkEmail = await userModel.checkEmail(email)
			if (checkEmail.length > 0) {
				throw new HttpError(400, 'Bad Requrest', 'User Already Exist')
			}

			const salt = await genSalt(10)
			const encryptedPassword = await hash(password, salt)
			const date = moment().format('YYYY-MM-DD HH:mm:ss')

			await userModel.register({
				user_id: uuid(),
				...data,
				password: encryptedPassword,
				created_at: date,
				updated_at: date,
			})

			delete data.password

			res.status(200).send({
				code: 200,
				status: 'OK',
				message: 'Succes Register',
				data,
			})
		} catch (error) {
			HttpError.handle(res, error)
		}
	},
}
