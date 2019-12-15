require('dotenv').config()
const express = require('express')
const db = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 9600
const app = express()
const HttpError = require('./helpers/HttpError')
const route = require('./routes')

app.use(morgan())
app.use('/api/v1', route)
app.use(cors())

app.get('/', (req, res) => {
	res.status(200).send({
		code: 200,
		status: 'OK',
		result: {
			message: 'Welcome to Tiket.in API',
		},
	})
})

app.get('*', (req, res) => {
	res.status(404).send({
		code: 404,
		status: 'Not Found',
		error: true,
		message: `Canot get ${req.path}`,
	})
})

const start = () => {
	try {
		db.connect(err => {
			if (err) {
				throw new HttpError(
					500,
					'Internal Server Error',
					'Cannot Connect To Database'
				)
			}
			console.log('Database Connected')
		})
		app.listen(PORT, () => {
			console.log(`Server listening on port: ${PORT}`)
		})
	} catch (error) {
		console.error(`An error occured on the server:`, error)
	}
}

start()
