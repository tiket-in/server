const db = require('../../config/db')

module.exports = {
	createUser: body => {
		return new Promise((resolve, reject) => {
			db.query('INSERT INTO users SET ?', [body], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},

	loginUser: email => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM users WHERE email = ? `,
				[email],
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
}
