const { expect } = require('chai')

const errorHandler = require('../error-handler')

describe('errorHandler', () => {
  it('Should return a TypeError with status 500', () => {
    const error = new TypeError('Cannot read property test of undefined')
    const data = errorHandler(error)
    expect(data.error.message).to.be.a('string')
    expect(data.error.status).to.be.eql(500)
  })

  it('Should return a SyntaxError with status 500', () => {
    const error = new SyntaxError('Missing  before statement')
    const data = errorHandler(error)
    expect(data.error.message).to.be.a('string')
    expect(data.error.status).to.be.eql(500)
  })

  it('Should return an Api data error.with status 400', () => {
    const error = {
      response: {
        status: 404,
        data: {
          message: 'Error retrieving the client'
        }
      }
    }
    const data = errorHandler(error)
    expect(data.error.message).to.be.eql('{"message":"Error retrieving the client"}')
    expect(data.error.status).to.be.eql(404)
  })

  it('Should return an Api data error.with status 500', () => {
    const error = {
      statusCode: 500,
      statusMessage: 'Server internal error'
    }
    const data = errorHandler(error)
    expect(data.error.message).to.be.eql('Server internal error')
    expect(data.error.status).to.be.eql(500)
  })
})
