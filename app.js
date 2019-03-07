const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const timeout = require('connect-timeout')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')

const { swagger } = require('./config')
const insurance = require('./api/routes/insurance')

const app = express()

app.use(compression())
app.use(logger('dev'))
app.use(timeout('10s'))
app.use(bodyParser.json({ limit: '100kb' }))
app.use(bodyParser.urlencoded({
  limit: '100kb',
  extended: true
}))
app.use(cookieParser())
app.use(haltOnTimedout)

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs.json', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    res.send(swaggerJSDoc(swagger))
    next()
  })
}
app.use(express.static('./public'))
app.use('/', insurance)

module.exports = app
