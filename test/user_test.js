const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const should = require('should')
const model = require('../server/models')
chai.use(require('chai-http'))
const truncate = require('../scripts/db/truncate')

describe('User controller', function () {
  beforeEach(async () => { return truncate('User') })

  const baseURL = '/user'

  it('Creates a user', (done) => {
    const requestBody = { name: 'example', email: 'example@example.com', pass: 'example' }
    chai
      .request(server)
      .post(baseURL)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.CREATED)
        const { success, user } = res.body
        success.should.be.equal(true)
        user.name.should.be.equal(requestBody.name)
        user.email.should.be.equal(requestBody.email)
        done()
      })
  })

  it('Updates a user', (done) => {
    const requestBody = { name: 'example', email: 'example@example.com' }
    model.User
      .create({ name: 'old_name', email: 'old_email@example.com', password: 'example', enabled: 'true' })
      .then(instance => {
        chai
          .request(server)
          .put(`${baseURL}/${instance.id}`)
          .send(requestBody)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.CREATED)
            res.body.success.should.be.equal(true)
            done()
          })
      })
  })
  it('Deletes a user', (done) => {
    model.User
      .create({ name: 'old_name', email: 'old_email@example.com', password: 'example', enabled: 'true' })
      .then(instance => {
        chai
          .request(server)
          .delete(`${baseURL}/${instance.id}`)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.CREATED)
            res.body.success.should.be.equal(true)
            done()
          })
      })
  })
  it('Deletes not existing user', (done) => {
    chai
      .request(server)
      .delete(`${baseURL}/${'no valid'}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR)
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('get not existing user', (done) => {
    chai
      .request(server)
      .get(`${baseURL}/${'no valid'}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR)
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('get existing user', (done) => {
    model.User
      .create({ name: 'old_name', email: 'old_email@example.com', password: 'example', enabled: 'true' })
      .then(() => {
        chai
          .request(server)
          .get(`${baseURL}`)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.OK)
            res.body.success.should.be.equal(true)
            should.equal(res.body.users.length, 1)
            done()
          })
      })
  })
  it('update existing user', (done) => {
    const requestBody = { name: 'example', email: 'example@example.com' }
    model.User
      .create({ name: 'old_name', email: 'old_email@example.com', password: 'example', enabled: 'true' })
      .then(instance => {
        chai
          .request(server)
          .put(`${baseURL}/${'does not exist'}`)
          .send(requestBody)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.body.success.should.be.equal(false)
            done()
          })
      })
  })
  it('email already registered', (done) => {
    const requestBody = {
      name: 'old_name',
      email: 'old_email@example.com',
      password: 'example',
      enabled: 'true'
    }
    model.User
      .create(requestBody)
      .then(instance => {
        chai
          .request(server)
          .post(baseURL)
          .send(requestBody)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
            res.body.should.have.property('errors')
            done()
          })
      })
  })
})
