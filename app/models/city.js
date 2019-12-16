const db = require('../../config/db')

module.exports = {
	getCity: () => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM city`, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getCityByName: city => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM city WHERE name LIKE ?`,
				`%${city}%`,
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
	addCity: data => {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO city SET ?`, data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
}
