const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const should = require('should')
const model = require('../server/models')
const truncate = require('../scripts/db/truncate')

chai.use(require('chai-http'))

describe('Payments controller', function () {
  beforeEach(function (done) {
    truncate('Payment')
    model.Payment.create(dummyPayment).then(setImmediate(done))
  })

  const baseURL = '/payments'
  const dummyPayment = { transactionId: 123, currency: 'ARS', amount: 45.5, paymentMethod: 'cash', status: 'pending' }

  it('Create payment OK', (done) => {
    const other = Object.assign({}, dummyPayment)
    other.transactionId = 111
    chai
      .request(server)
      .post(baseURL)
      .send(other)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.CREATED)
        const { success, payment } = res.body
        success.should.be.equal(true)
        payment.transactionId.should.be.equal(other.transactionId)
        payment.currency.should.be.equal(other.currency)
        payment.amount.should.be.equal(other.amount)
        payment.paymentMethod.should.be.equal(other.paymentMethod)
        payment.status.should.be.equal(other.status)
        setImmediate(done)
      })
  })

  it('Create payment FAIL duplicate id', (done) => {
    chai
      .request(server)
      .post(baseURL)
      .send(dummyPayment)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.success.should.be.equal(false)
        setImmediate(done)
      })
  })

  it('Update payment OK', (done) => {
    const requestBody = { status: 'approved' }
    chai.request(server)
      .put(`${baseURL}/${dummyPayment.transactionId}`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        setImmediate(done)
      })
  })

  it('Update payment FAIL not found', (done) => {
    const requestBody = { status: 'approved' }
    chai.request(server)
      .put(`${baseURL}/1234567890`)
      .send(requestBody)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.success.should.be.equal(false)
        setImmediate(done)
      })
  })

  it('Get enums OK', (done) => {
    chai.request(server)
      .get(`${baseURL}/ui-enums`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        setImmediate(done)
      })
  })

  it('Delete payment OK', (done) => {
    chai.request(server)
      .delete(`${baseURL}/${dummyPayment.transactionId}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        setImmediate(done)
      })
  })

  it('Delete payment FAIL not found', (done) => {
    chai.request(server)
      .delete(`${baseURL}/1234567890`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(false)
        setImmediate(done)
      })
  })

  it('Get payments OK', (done) => {
    chai.request(server)
      .get(`${baseURL}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.success.should.be.equal(true)
        chai.expect(res.body.payments).to.be.an('array')
        chai.expect(res.body.payments).to.have.length(1)
        chai.expect(res.body.payments[0].transactionId).to.equal(dummyPayment.transactionId)
        setImmediate(done)
      })
  })
})
