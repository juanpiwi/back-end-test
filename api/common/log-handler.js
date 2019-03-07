const Fs = require('fs')
const winston = require('winston')

const { log } = require('./../../config')

if (!Fs.existsSync(log.directory)) {
  // Create the directory if it does not exist
  Fs.mkdirSync(log.directory)
}

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: true,
      level: 'debug',
      colorize: true
    }),
    new winston.transports.File({
      dirname: log.directory,
      filename: log.filename
    }),
    new (require('winston-daily-rotate-file'))({
      dirname: log.directory,
      filename: log.filename
    })
  ]
})

module.exports = Logger
