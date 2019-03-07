module.exports = {
  PORT: 3000,
  environment: 'develop',
  apiKey: 'a4811fx8e88a6x11c78g',
  mocky: {
    timeout: 10000,
    apiUrl: 'http://www.mocky.io/v2'
  },
  swagger: {
    swaggerDefinition: {
      info: {
        version: '1.0.0',
        title: 'Insurance Company Back-End',
        description: 'Building REST API with NodeJS and Express',
        contact: {
          name: 'Juan Pablo Ferrari',
          email: 'ferrarijuanp@gmail.com'
        }
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        ApiKeyAuth: {
          type: 'apiKey',
          name: 'X-API-KEY',
          in: 'header'
        }
      },
      security: [
        { ApiKeyAuth: [] }
      ]
    },
    apis: [
      './api/controllers/**/*.js'
    ]
  },
  log: {
    directory: './logs',
    filename: 'hoteles-api.log'
  }
}
