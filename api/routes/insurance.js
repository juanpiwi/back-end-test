
const express = require('express')
const app = express.Router()

const { getClientId, getClientName, getPolicyUserName, getPolicyId } = require('../controllers')
const authenticate = require('./../middlewares/authenticate')

app.get('/client/user-id/:userId', authenticate, getClientId)
app.get('/client/user-name/:userName', authenticate, getClientName)

app.get('/policy/user-name/:userName', authenticate, getPolicyUserName)
app.get('/policy/:policyNumber', authenticate, getPolicyId)

module.exports = app
