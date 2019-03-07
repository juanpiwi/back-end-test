/**
 * Policy Service
 */

const BluebirdPromise = require('bluebird')
const BluebirdRequest = BluebirdPromise.promisifyAll(require('request'))

const { mocky } = require('./../../config')
const Logger = require('./../common/log-handler')
const errorHandler = require('./../common/error-handler')

/** Class representing a Policy. */
class PolicyService {
  /**
   * Expose Entity - Returns a User object from Clients
   * @param {string} policyNumber - Policy Number
   * @returns {object}
   */
  static getPolicyNumber (policyNumber) {
    const parallelPromises = []
    // GET Policies
    let options = {
      method: 'GET',
      uri: `${mocky.apiUrl}/580891a4100000e8242b75c5`,
      json: true,
      timeout: mocky.timeout,
      time: true
    }
    Logger.debug(`services : getPolicyNumber : policies : Endpoint ${options.uri}`)
    parallelPromises.push(BluebirdRequest.getAsync(options))

    // Get Clients
    options.uri = `${mocky.apiUrl}/5808862710000087232b75ac`
    Logger.debug(`services : getPolicyNumber :clients : Endpoint ${options.uri}`)

    parallelPromises.push(BluebirdRequest.getAsync(options))
    return Promise.all(parallelPromises).then((response) => {
      if (!response.some(currResponse => currResponse.statusCode !== 200)) {
        const policies = response[0].body.policies
        const clients = response[1].body.clients
        const policy = policies.find(currPolicy => {
          return currPolicy.id === policyNumber
        })

        Logger.info(`services : getPolicyNumber : policies : success | time: ${response[0].elapsedTime} ms`)
        Logger.info(`services : getPolicyNumber : clients : success | time: ${response[1].elapsedTime} ms`)

        if (policy) {
          const client = clients.find(currClient => currClient.id === policy.clientId)
          if (client && client.role === 'admin') {
            return Promise.resolve(client)
          }
          return Promise.resolve(errorHandler({ statusMessage: 'Error retrieving the client', statusCode: 404 }))
        }
        return Promise.resolve(errorHandler({ statusMessage: 'Error retrieving the client', statusCode: 404 }))
      }

      Logger.error(`services : getPolicyNumber : policies : Error | status: ${response[0].statusCode} | time: ${response[0].elapsedTime} ms`)
      Logger.error(`services : getPolicyNumber : clients : Error | statis: ${response[1].statusCode}  | time: ${response[1].elapsedTime} ms`)
      return BluebirdPromise.resolve(errorHandler(response.find(currResponse => currResponse.statusCode === 500)))
    }).catch(reason => {
      Logger.error(`services : getPolicyNumber : Error | time: ${reason.elapsedTime} ms`)
      return Promise.reject(reason)
    })
  }

  /**
   * Expose Entity - Returns a Policy Array from Policies
   * @param {string} name - User name
   * @returns {Array}
   */
  static getName (name) {
    let options = {
      method: 'GET',
      uri: `${mocky.apiUrl}/5808862710000087232b75ac`,
      json: true,
      timeout: mocky.timeout,
      time: true
    }
    Logger.debug(`services : getName : Endpoint ${options.uri}`)

    return BluebirdRequest.getAsync(options)
      .then(responsePolicies => {
        if (responsePolicies.statusCode === 200) {
          const clients = responsePolicies.body.clients
          const client = clients.find(currClient => currClient.name === name)

          Logger.info(`services : getName : success | time: ${responsePolicies.elapsedTime} ms`)

          if (client && client.role === 'admin') {
            options.uri = `${mocky.apiUrl}/580891a4100000e8242b75c5`
            Logger.debug(`services : getName : Endpoint ${options.uri}`)

            return BluebirdRequest.getAsync(options)
              .then(responseClients => {
                if (responseClients.statusCode === 200) {
                  const policies = responseClients.body.policies
                  const payload = policies.filter(currPolicy => currPolicy.clientId === client.id)

                  Logger.info(`services : getName : success | time: ${responseClients.elapsedTime} ms`)
                  return Promise.resolve(payload)
                } else {
                  return Promise.reject(responseClients)
                }
              }).catch(error => {
                Logger.error(`services : getName : Error | time: ${error.elapsedTime} ms`)
                return BluebirdPromise.resolve(errorHandler(error))
              })
          }
          return Promise.resolve(errorHandler({ statusMessage: 'Error retrieving the policies', statusCode: 404 }))
        } else {
          Logger.error(`services : getName : Error | time: ${responsePolicies.elapsedTime} ms`)
          return BluebirdPromise.resolve(errorHandler(responsePolicies))
        }
      })
  }
}

/**
 * Expose Policy Service
 */
module.exports = PolicyService
