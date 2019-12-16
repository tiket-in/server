const express = require('express')
const users = require('./users')
const flight = require('./flight')
const city = require('./city')

const Router = express.Router()

Router.use('/user', users)
Router.use('/flight', flight)
Router.use('/city', city)

module.exports = Router
