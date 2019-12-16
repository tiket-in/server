const express = require('express')
const users = require('./users')

const Router = express.Router()

Router.use('/user', users)

module.exports = Router
