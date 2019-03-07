/**
 * Module dependencies
 */
const { expect } = require('chai')
const nock = require('nock')

const { mocky } = require('./../../../config')
const ClientService = require('../clients')
const serverResponse = require('./mocks/clients.json')

describe('Clients service - Success', () => {
  const userId = '111111-a'
  const name = 'Manning'

  beforeEach(() => {
    nock(mocky.apiUrl)
      .get('/5808862710000087232b75ac')
      .reply(200, serverResponse)
  })

  after(() => {
    nock.cleanAll()
  })

  it('getId - should fetch the data for exact combinations', (done) => {
    // Call ClientService getId method
    ClientService.getId(userId).then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal(serverResponse.clients.find(currClient => currClient.id === userId))
      expect(result).to.contain.all.keys(['id', 'name', 'email', 'role'])

      // Next Test!
      done()
    })
  })

  it('getName - should fetch the data for exact combinations', (done) => {
    // Call ClientService getName method
    ClientService.getName(name).then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal(serverResponse.clients.find(currClient => currClient.name === name))
      expect(result).to.contain.all.keys(['id', 'name', 'email', 'role'])
      // Next Test!
      done()
    })
  })
})

describe('Clients service - Not Found', () => {
  const errorResponse = { error: { status: 404, message: 'Error retrieving the client' } }

  beforeEach(() => {
    nock(mocky.apiUrl)
      .get('/5808862710000087232b75ac')
      .reply(200, serverResponse)
  })

  after(() => {
    nock.cleanAll()
  })

  it('getId - should not fetch the data for exact combinations', (done) => {
    // Call ClientService getId method
    ClientService.getId('a3b8d425-2b60').then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal(errorResponse)
      expect(result).to.contain.all.keys(['error'])
      // Next Test!
      done()
    })
  })

  it('getName - should not fetch the data for exact combinations', (done) => {
    // Call ClientService getName method
    ClientService.getName('Juan').then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal(errorResponse)
      expect(result).to.contain.all.keys(['error'])
      // Next Test!
      done()
    })
  })
})

describe('Clients service - Error', () => {
  beforeEach(() => {
    nock(mocky.apiUrl)
      .get('/5808862710000087232b75ac')
      .reply(500)
  })

  after(() => {
    nock.cleanAll()
  })

  it('getId - should fail to fetch the data for exact combinations', (done) => {
    // Call ClientService getId method
    ClientService.getId('1qawsdfde45').then((result) => {
      // Check response is as expected
      expect(result).to.contain.all.keys(['error'])
      expect(result.error.status).to.equal(500)
      // Next Test!
      done()
    })
  })

  it('getName - should fail to fetch the data for exact combinations', (done) => {
    // Call ClientService getName method
    ClientService.getName('Julieta').then((result) => {
      // Check response is as expected
      expect(result).to.contain.all.keys(['error'])
      expect(result.error.status).to.equal(500)
      // Next Test!
      done()
    })
  })
})
