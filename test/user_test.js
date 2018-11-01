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
})
