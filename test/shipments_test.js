const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const should = require('should')
const model = require('../server/models')
const truncate = require('../scripts/db/truncate')

chai.use(require('chai-http'))

describe('Shipments controller', function () {
  beforeEach(async () => {
    return truncate('Shipment').then(() => {
      model.Shipment.create(dummyShipment)
    })
  })

  const baseURL = '/shipments'
  const dummyShipment = { id: 1, transactionId: 123, address: 'Calle falsa 123', status: 'pending' }

  it('Create shipment OK', (done) => {
    const other = Object.assign({}, dummyShipment)
    other.transactionId = 111
    chai
      .request(server)
      .post(baseURL)
      .send(other)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.CREATED)
        const { success, shipment } = res.body
        success.should.be.equal(true)
        shipment.transactionId.should.be.equal(other.transactionId)
        shipment.address.should.be.equal(other.address)
        shipment.status.should.be.equal(other.status)
        done()
      })
  })

  it('Update shipment OK', (done) => {
    const requestBody = { status: 'shipped' }
    chai.request(server)
      .put(`${baseURL}/${dummyShipment.id}`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        done()
      })
  })

  it('Update shipment FAIL not found', (done) => {
    const requestBody = { status: 'shipped' }
    chai.request(server)
      .put(`${baseURL}/1234567890`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.success.should.be.equal(false)
        done()
      })
  })

  it('Update shipment FAIL invalid status', (done) => {
    const requestBody = { status: 'asd' }
    chai.request(server)
      .put(`${baseURL}/${dummyShipment.id}`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.success.should.be.equal(false)
        done()
      })
  })

  it('Get enums OK', (done) => {
    chai.request(server)
      .get(`${baseURL}/ui-enums`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        done()
      })
  })

  it('Get shipments OK', (done) => {
    chai.request(server)
      .get(`${baseURL}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        chai.expect(res.body.shipments).to.be.an('array')
        chai.expect(res.body.shipments).to.have.length(1)
        chai.expect(res.body.shipments[0].id).to.equal(dummyShipment.id)
        done()
      })
  })
})
