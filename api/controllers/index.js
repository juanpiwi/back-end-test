/**
 * Module dependencies
 */
const ClientService = require('./../services/clients')
const PolicyService = require('../services/policies')

/**
 * @swagger
 * /client/user-id/{userId}:
 *  get:
 *    description: Get user data filtered by user id.
 *    tags:
 *        - Clients
 *    parameters:
 *        - name: userId
 *          in: path
 *          description: User ID
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: The request has succeeded
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 *      503:
 *        description: Service unavailable
 */
exports.getClientId = (req, res, next) => {
  ClientService.getId(req.params.userId).then((data) => {
    // Check the result status, by default 200.
    const status = (data.error) ? data.error.status : 200
    res.status(status)
    res.json(data)
  }).catch((err) => {
    next(err)
  })
}

/**
 * @swagger
 * /client/user-name/{userName}:
 *  get:
 *    description: Get user data filtered by user name.
 *    tags:
 *        - Clients
 *    parameters:
 *        - name: userName
 *          in: path
 *          description: User Name
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: The request has succeeded
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 *      503:
 *        description: Service unavailable
 */
exports.getClientName = (req, res, next) => {
  ClientService.getName(req.params.userName).then((data) => {
    // Check the result status, by default 200.
    const status = (data.error) ? data.error.status : 200
    res.status(status)
    res.json(data)
  }).catch((err) => {
    next(err)
  })
}

/**
 * @swagger
 * /policy/user-name/{userName}:
 *  get:
 *    description: Get the list of policies linked to a user name.
 *    tags:
 *        - Policies
 *    parameters:
 *        - name: userName
 *          in: path
 *          description: User Name
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: The request has succeeded
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 *      503:
 *        description: Service unavailable
 */
exports.getPolicyUserName = (req, res, next) => {
  PolicyService.getName(req.params.userName).then((data) => {
    // Check the result status, by default 200.
    const status = (data.error) ? data.error.status : 200
    res.status(status)
    res.json(data)
  }).catch((err) => {
    next(err)
  })
}

/**
 * @swagger
 * /policy/{policyNumber}:
 *  get:
 *    description: Get the user linked to a policy number.
 *    tags:
 *        - Policies
 *    parameters:
 *        - name: policyNumber
 *          in: path
 *          description: Policy Number
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: The request has succeeded
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 *      503:
 *        description: Service unavailable
 */
exports.getPolicyId = (req, res, next) => {
  PolicyService.getPolicyNumber(req.params.policyNumber).then((data) => {
    // Check the result status, by default 200.
    const status = (data.error) ? data.error.status : 200
    res.status(status)
    res.json(data)
  }).catch((err) => {
    next(err)
  })
}