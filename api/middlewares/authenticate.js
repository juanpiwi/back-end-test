const { apiKey } = require('./../../config')

const Unauthorized = res => (
  res.status(401).json({
    status: 401,
    message: 'Unauthorized'
  })
)

/**
 * Middleware to authenticate API.
 */
module.exports = (req, res, next) => {
  const clientId = req.headers['x-api-key']
  if (clientId && clientId === apiKey) {
    return next()
  }
  return Unauthorized(res)
}
