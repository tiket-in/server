const db = require('../../config/db')

module.exports = {
	getFlight: (fromCity, toCity, fromDate) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT fs.*, cf.name AS from_city, ct.name AS to_city
      FROM flight_schedule fs, city cf, city ct
		  WHERE fs.from_id_city=cf.id AND fs.to_id_city=ct.id AND
      fs.from_id_city= ? AND fs.to_id_city= ? AND DATE(fs.from_at)= ?`

			db.query(query, [fromCity, toCity, fromDate], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
}
