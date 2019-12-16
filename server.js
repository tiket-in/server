require('dotenv').config()
const express = require('express')
const db = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')
const fileUploads = require('express-fileupload')

const PORT = process.env.PORT || 9600
const app = express()
const route = require('./routes')

app.use(morgan('dev'))
app.use(cors())
app.use(express.static('./public'))
app.use(
	fileUploads({
		useTempFiles: true,
		tempFileDir: './public/assets',
	})
)

app.use('/api/v1', route)
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
				throw err
			}
			console.log('Database Connected')
		})
		app.listen(PORT, () => {
			console.log(`Server listening on http://localhost/${PORT}`)
		})
	} catch (error) {
		console.error(`An error occured on the server:`, error)
	}
}

start()

module.exports = app
