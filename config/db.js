const mysql = require('mysql')

const db = mysql.createConnection({
	host: '',
	user: '',
	password: '',
	port: '',
})

module.exports = db
