const app = require('../server/index')
const server = app.listen()
const httpStatus = require('http-status-codes')
const chai = require('chai')
const model = require('../server/models')
const truncate = require('../scripts/db/truncate')

chai.use(require('chai-http'))

describe('Payments controller', function () {
  beforeEach(function (done) {
    truncate('Payment')
    done()
  })

  const baseURL = '/payments'
  const dummyPayment = { transactionId: 123, currency: 'ARS', amount: 45.5, paymentMethod: 'cash', status: 'pending' }

  it('Creates a payment', (done) => {
    chai
      .request(server)
      .post(baseURL)
      .send(dummyPayment)
      .then((res) => {
        res.should.have.status(httpStatus.CREATED)
        const { success, payment } = res.body
        success.should.be.equal(true)
        payment.transactionId.should.be.equal(dummyPayment.transactionId)
        payment.currency.should.be.equal(dummyPayment.currency)
        payment.amount.should.be.equal(dummyPayment.amount)
        payment.paymentMethod.should.be.equal(dummyPayment.paymentMethod)
        payment.status.should.be.equal(dummyPayment.status)
        done()
      })
  })

  it('Updates a payment ok', (done) => {
    const requestBody = { transactionId: '123', status: 'approved' }
    model.Payment
      .create(dummyPayment)
      .then(instance => {
        chai
          .request(server)
          .put(`${baseURL}/${instance.id}`)
          .send(requestBody)
          .then((res) => {
            res.should.have.status(httpStatus.OK)
            res.body.success.should.be.equal(true)
            done()
          })
      })
  })
})
