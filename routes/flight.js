const expres = require('express')
const flightController = require('../app/controllers/flight')
const Router = expres.Router()

Router.get('/', flightController.getFlight)
Router.post('/booking', flightController.flightBooking)

module.exports = Router
