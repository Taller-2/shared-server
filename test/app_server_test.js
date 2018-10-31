const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const should = require('should')
const model = require('../server/models')
chai.use(require('chai-http'))
const truncate = require('../scripts/db/truncate')

describe('App server controller', function () {
  beforeEach(function (done) {
    truncate('AppServer').then(setImmediate(done))
  })

  const baseURL = '/app-server'

  it('Creates a server', (done) => {
    const requestBody = { name: 'example', url: 'example.com' }
    chai
      .request(server)
      .post(baseURL)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.CREATED)
        const { success, server } = res.body
        success.should.be.equal(true)
        server.name.should.be.equal(requestBody.name)
        server.url.should.be.equal(requestBody.url)
        setImmediate(done)
      })
  })

  it('Destroys a server', (done) => {
    model.AppServer
      .create({ name: 'example', url: 'example.com' })
      .then(instance => {
        chai
          .request(server)
          .delete(`${baseURL}/${instance.id}/`)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.OK)
            res.body.success.should.be.equal(true)
            setImmediate(done)
          })
      })
  })

  it('Lists all servers', (done) => {
    this.timeout(2500)
    let instances = [
      { name: 'example1', url: 'example1.com' },
      { name: 'example2', url: 'example2.com' }
    ]
    model.AppServer
      .bulkCreate(instances)
      .then(() => {
        chai
          .request(server)
          .get(baseURL)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.OK)
            const { success, servers } = res.body
            success.should.be.equal(true)
            servers.length.should.equal(instances.length)
            setImmediate(done)
          })
      })
      .catch((err) => (err))
  })
})
