const express = require('express')
const users = require('./users')
const flight = require('./flight')

const Router = express.Router()

Router.use('/user', users)
Router.use('/flight', flight)

module.exports = Router
