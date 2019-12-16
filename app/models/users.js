const db = require('../../config/db')

module.exports = {
	checkEmail: email => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users WHERE email = ? `, email, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(new Error(err))
				}
			})
		})
	},

	register: data => {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO users SET ? `, [data], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(new Error(err))
				}
			})
		})
	},
}
