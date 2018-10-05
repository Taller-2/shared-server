const chai = require('chai')
const chaihttp = require('chai-http')
var should = require('should')
var app = require('../server/index')
var server = app.listen()
chai.use(chaihttp)

describe('shipment cost test', function () {
  it('should receive shipment cost value that is zero', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'test_rule': true })
      .end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.have.length(1)
        res.body[0].should.be.a('object')
        res.body[0].should.have.property('message')
        res.body[0].message.should.equal(0)
        setImmediate(done)
      })
  })
  after(function (done) {
    server.close()
    done()
  })
})
