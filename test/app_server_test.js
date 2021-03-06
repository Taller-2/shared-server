const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const should = require('should')
const model = require('../server/models')
chai.use(require('chai-http'))
const truncate = require('../scripts/db/truncate')

describe('App server controller', function () {
  beforeEach(async () => { return truncate('AppServer') })

  const baseURL = '/app-server'

  it('Creates a server', (done) => {
    const requestBody = { name: 'example', secret: '', url: 'example.com' }
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
        done()
      })
  })

  it('Destroys a server', (done) => {
    model.AppServer
      .create({ name: 'example', secret: '', url: 'example.com' })
      .then(instance => {
        chai
          .request(server)
          .delete(`${baseURL}/${instance.id}/`)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.OK)
            res.body.success.should.be.equal(true)
            done()
          })
      })
  })

  it('Lists all servers', (done) => {
    let instances = [
      { name: 'example1', secret: '', url: 'example1.com' },
      { name: 'example2', secret: '', url: 'example2.com' }
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
            done()
          })
      })
      .catch((err) => (err))
  })
})
