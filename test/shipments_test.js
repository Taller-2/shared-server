const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const should = require('should')
const model = require('../server/models')
const truncate = require('../scripts/db/truncate')

chai.use(require('chai-http'))

let id
let transactionId
let invalidTransactionId

describe('Shipments controller', function () {
  beforeEach((done) => {
    truncate('Payment').then(() => {
      model.Payment.create(dummyPayment).then((payment) => {
        transactionId = payment.transactionId
        invalidTransactionId = transactionId + 1
        truncate('Shipment').then(() => {
          model.Shipment
            .create(dummyShipment)
            .then((shipment) => {
              id = shipment.id
              done()
            })
        })
      })
    })
  })

  const baseURL = '/shipments'
  const dummyShipment = {
    address: 'Calle falsa 123',
    status: 'pending'
  }
  const dummyPayment = {
    currency: 'ARS',
    amount: 45.5,
    paymentMethod: 'cash',
    status: 'approved'
  }

  it('Create shipment OK', (done) => {
    const other = Object.assign({}, dummyShipment)
    other.transactionId = transactionId
    chai
      .request(server)
      .post(baseURL)
      .send(other)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.CREATED)
        const { success, shipment } = res.body
        success.should.be.equal(true)
        shipment.address.should.be.equal(dummyShipment.address)
        shipment.status.should.be.equal(dummyShipment.status)
        done()
      })
  })
  it('Create shipment FAIL payment does not exist', (done) => {
    const other = Object.assign({}, dummyShipment)
    other.transactionId = invalidTransactionId
    chai
      .request(server)
      .post(baseURL)
      .send(other)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        const { success } = res.body
        success.should.be.equal(false)
        done()
      })
  })
  it('Create shipment FAIL transactionId too long', (done) => {
    const other = Object.assign({}, dummyShipment)
    other.transactionId = 9999999999999999999999999999999999999999999999999999999999999
    chai
      .request(server)
      .post(baseURL)
      .send(other)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        const { success } = res.body
        success.should.be.equal(false)
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
      .put(`${baseURL}/${id}`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.success.should.be.equal(false)
        done()
      })
  })

  it('Update shipment FAIL invalid status type', (done) => {
    const requestBody = { status: 1 }
    chai.request(server)
      .put(`${baseURL}/${id}`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.success.should.be.equal(false)
        done()
      })
  })

  it('Update shipment FAIL invalid id', (done) => {
    const requestBody = { status: 'shipped' }
    chai.request(server)
      .put(`${baseURL}/${999}`)
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
        chai.expect(res.body.shipments[0].id).to.equal(id)
        done()
      })
  })
  it('delete shipments OK', (done) => {
    chai.request(server)
      .delete(`${baseURL}/${id}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        done()
      })
  })
})
