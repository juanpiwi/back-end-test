/**
 * Module dependencies
 */
const insurance = require('./insurance')
const swagger = require('./swagger')

// Add routes to ragnar
module.exports = (router) => {
  insurance(router)
  swagger(router)
}
