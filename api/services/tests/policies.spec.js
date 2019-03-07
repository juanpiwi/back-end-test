/**
 * Module dependencies
 */
const { expect } = require('chai')
const nock = require('nock')

const { mocky } = require('./../../../config')
const PolicyService = require('./../policies')

const policyResponse = require('./mocks/policies.json')
const clientResponse = require('./mocks/clients.json')

describe('Policies service - Success', () => {
  beforeEach(() => {
    nock(mocky.apiUrl)
      .get('/580891a4100000e8242b75c5')
      .reply(200, policyResponse)
    nock(mocky.apiUrl)
      .get('/5808862710000087232b75ac')
      .reply(200, clientResponse)
  })

  after(() => {
    nock.cleanAll()
  })

  it('getName - should fetch the data for exact combinations', (done) => {
    const policyResult = [
      {
        id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
        amountInsured: 399.89,
        email: 'inesblankenship@quotezart.com',
        inceptionDate: '2015-07-06T06:55:49Z',
        installmentPayment: true,
        clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
      },
      {
        id: '6f514ec4-1726-4628-974d-20afe4da130c',
        amountInsured: 697.04,
        email: 'inesblankenship@quotezart.com',
        inceptionDate: '2014-09-12T12:10:23Z',
        installmentPayment: false,
        clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86' },
      { id: '25202f31-fff0-481c-acfd-1f3ff2a9bcbe',
        amountInsured: 2579.16,
        email: 'inesblankenship@quotezart.com',
        inceptionDate: '2016-05-03T04:58:48Z',
        installmentPayment: false,
        clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86' 
      }
    ]
    // Call PolicyService getName method
    PolicyService.getName('Mateo').then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal(policyResult)
      result.forEach(currPolicy => {
        expect(currPolicy).to.contain.all.keys(['id', 'amountInsured', 'email', 'inceptionDate', 'installmentPayment', 'clientId'])
      })
      // Next Test!
      done()
    })
  })

  it('getPolicyNumber - should fetch the data for exact combinations', (done) => {
    // Call PolicyService getPolicyNumber method
    PolicyService.getPolicyNumber('7b624ed3-00d5-4c1b-9ab8-c265067ef58b').then((result) => {
    // Check response is as expected
      expect(result).to.deep.equal({
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Mateo',
        email: 'mateo@quotezart.com',
        role: 'admin'
      })
      expect(result).to.contain.all.keys(['id', 'name', 'email', 'role'])
      // Next Test!
      done()
    })
  })
})

describe('Policies service - Not Found', () => {
  beforeEach(() => {
    nock(mocky.apiUrl)
      .get('/580891a4100000e8242b75c5')
      .reply(200, policyResponse)
    nock(mocky.apiUrl)
      .get('/5808862710000087232b75ac')
      .reply(200, clientResponse)
  })

  after(() => {
    nock.cleanAll()
  })

  it('getName - should not the data for exact combinations', (done) => {
    // Call PolicyService getName method
    PolicyService.getName('Carlos').then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal({ error: { status: 404, message: 'Error retrieving the policies' } })
      expect(result).to.contain.all.keys(['error'])
      // Next Test!
      done()
    })
  })

  it('getPolicyNumber - should not the data for exact combinations', (done) => {
    // Call PolicyService getPolicyNumber method
    PolicyService.getPolicyNumber('123a-23s-2323d').then((result) => {
      // Check response is as expected
      expect(result).to.deep.equal({ error: { status: 404, message: 'Error retrieving the client' } })
      expect(result).to.contain.all.keys(['error'])
      // Next Test!
      done()
    })
  })
})

describe('Policies service - Error', () => {
  beforeEach(() => {
    nock(mocky.apiUrl)
      .get('/580891a4100000e8242b75c5')
      .reply(500)
    nock(mocky.apiUrl)
      .get('/5808862710000087232b75ac')
      .reply(500)
  })

  after(() => {
    nock.cleanAll()
  })

  it('getName - should fail to fetch the data for exact combinations', (done) => {
    // Call ClientService getName method
    PolicyService.getName('Sofia').then((result) => {
      // Check response is as expected
      expect(result).to.contain.all.keys(['error'])
      expect(result.error.status).to.equal(500)
      // Next Test!
      done()
    })
  })

  it('getName - should fail to fetch the data for exact combinations', (done) => {
    // Call ClientService getPolicyNumber method
    PolicyService.getPolicyNumber('Sof1123-12ia').then((result) => {
      // Check response is as expected
      expect(result).to.contain.all.keys(['error'])
      expect(result.error.status).to.equal(500)
      // Next Test!
      done()
    })
  })
})
