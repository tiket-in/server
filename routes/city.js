const epxress = require('express')
const cityController = require('../app/controllers/city')
const Router = epxress.Router()

Router.get('/', cityController.getCity)
Router.get('/search', cityController.getCityByName)
Router.post('/', cityController.addCity)

module.exports = Router
