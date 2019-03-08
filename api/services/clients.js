/**
 * Client Service
 */

const BluebirdPromise = require('bluebird')
const BluebirdRequest = BluebirdPromise.promisifyAll(require('request'))
const _ = require('lodash/core')

const { mocky } = require('./../../config')
const Logger = require('./../common/log-handler')
const errorHandler = require('./../common/error-handler')

/** Class representing a client. */
class ClientService {
  /**
   * Expose Entity - Returns a User object from Clients
   * @param {string} id - User ID
   * @returns {object}
   */
  static getId (id) {
    let options = {
      method: 'GET',
      uri: `${mocky.apiUrl}/5808862710000087232b75ac`,
      json: true,
      timeout: mocky.timeout,
      time: true
    }
    Logger.debug(`services : getId : Endpoint ${options.uri}`)

    return BluebirdRequest.getAsync(options)
      .then((response) => {
        if (response.statusCode === 200) {
          Logger.info(`services : getId : success | time: ${response.elapsedTime} ms`)
          const clients = response.body.clients
          const client = _.find(clients, (currClient) => currClient.id === id)
          if (client) {
            return BluebirdPromise.resolve(client)
          }
          return BluebirdPromise.resolve(errorHandler({ statusMessage: 'Error retrieving the client', statusCode: 404 }))
        } else {
          Logger.error(`services : getId : Error | time: ${response.elapsedTime} ms`)
          return BluebirdPromise.resolve(errorHandler(response))
        }
      })
  }

  /**
   * Expose Entity - Returns a User object from Clients
   * @param {string} name - User Name
   * @returns {object}
   */
  static getName (name) {
    let options = {
      method: 'GET',
      uri: `${mocky.apiUrl}/5808862710000087232b75ac`,
      json: true,
      timeout: mocky.timeout,
      time: true
    }
    Logger.debug('services : getName : Endpoint %s', options.uri)

    return BluebirdRequest.getAsync(options)
      .then(response => {
        if (response.statusCode === 200) {
          Logger.info(`services : getName : success | time: ${response.elapsedTime} ms`)
          const clients = response.body.clients
          const client = _.find(clients, (currClient) => currClient.name === name)

          if (client) {
            return BluebirdPromise.resolve(client)
          }
          return BluebirdPromise.resolve(errorHandler({ statusMessage: 'Error retrieving the client', statusCode: 404 }))
        } else {
          Logger.error(`services : getName : error | time: ${response.elapsedTime} ms`)
          return BluebirdPromise.resolve(errorHandler(response))
        }
      })
  }
}

/**
 * Expose Client Service
 */
module.exports = ClientService
