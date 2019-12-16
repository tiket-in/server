const express = require('express')
const userController = require('../app/controllers/users')

const Router = express.Router()

Router.post('/register', userController.register)

module.exports = Router
