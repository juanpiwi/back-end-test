/**
 * Module dependencies
 */
const { expect } = require('chai')
const request = require('supertest')

const { apiKey } = require('./../../../config')
const app = require('../../../app')

describe('API Integration', () => {
  describe('/client/user-id/:userId', () => {
    const userId = 'a0ece5db-cd14-4f21-812f-966633e7be86'
    it('getClientId - Status: 200', () => {
      request(app)
        .get(`/client/user-id/${userId}`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.deep.equal({
            id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
            name: 'Britney',
            email: 'britneyblankenship@quotezart.com',
            role: 'admin' })
        })
    })

    it('getClientId - Status: 404', () => {
      request(app)
        .get(`/client/user-id/123-aaaa-bbb`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => {
          expect(res.body).to.deep.equal({ error: { status: 404, message: 'Error retrieving the client' } })
        })
    })

    it('getClientId - Status: 401', (done) => {
      request(app)
        .get(`/client/user-id/${userId}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.deep.equal({ status: 401, message: 'Unauthorized' })
          if (err) throw err
          done()
        })
    })
  })

  describe('/client/user-name/:userName', () => {
    const userName = 'Britney'
    it('getClientName - Status: 200', () => {
      request(app)
        .get(`/client/user-name/${userName}`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.deep.equal({
            id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
            name: 'Britney',
            email: 'britneyblankenship@quotezart.com',
            role: 'admin' })
        })
    })

    it('getClientName - Status: 404', () => {
      request(app)
        .get(`/client/user-name/123-aaaa-bbb`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => {
          expect(res.body).to.deep.equal({ error: { status: 404, message: 'Error retrieving the client' } })
        })
    })

    it('getClientName - Status: 401', (done) => {
      request(app)
        .get(`/client/user-name/${userName}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.deep.equal({ status: 401, message: 'Unauthorized' })
          if (err) throw err
          done()
        })
    })
  })

  describe('/policy/user-name/:userName', () => {
    const userName = 'Manning'
    const serverResponse = require('./mocks/policies.json')
    it('getPolicyUserName - Status: 200', () => {
      request(app)
        .get(`/policy/user-name/${userName}`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          // console.log('qa', res.body)
          expect(res.body).to.deep.equal(serverResponse)
        })
    })

    it('getPolicyUserName - Status: 404', () => {
      request(app)
        .get(`/policy/user-name/juan`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => {
          expect(res.body).to.deep.equal({ error: { status: 404, message: 'Error retrieving the policies' } })
        })
    })

    it('getPolicyUserName - Status: 401', (done) => {
      request(app)
        .get(`/policy/user-name/${userName}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.deep.equal({ status: 401, message: 'Unauthorized' })
          if (err) throw err
          done()
        })
    })
  })

  describe('/policy/:policyNumber', () => {
    const policyNumber = '64cceef9-3a01-49ae-a23b-3761b604800b'
    it('getPolicyId - Status: 200', () => {
      request(app)
        .get(`/policy/${policyNumber}`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.deep.equal({ 
            id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
            name: 'Manning',
            email: 'manningblankenship@quotezart.com',
            role: 'admin' })
        })
    })

    it('getPolicyId - Status: 404', () => {
      request(app)
        .get(`/policy/123-aaaa-bbb`)
        .set('x-api-key', apiKey)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => {
          expect(res.body).to.deep.equal({ error: { status: 404, message: 'Error retrieving the client' } })
        })
    })

    it('getPolicyId - Status: 401', (done) => {
      request(app)
        .get(`/policy/${policyNumber}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.deep.equal({ status: 401, message: 'Unauthorized' })
          if (err) throw err
          done()
        })
    })
  })
})
