const expres = require('express')
const flightController = require('../app/controllers/flight')
const Router = expres.Router()

Router.get('/', flightController.getFlight)
Router.post('/booking', flightController.flightBooking)
Router.post('/', flightController.addFlight)

module.exports = Router
