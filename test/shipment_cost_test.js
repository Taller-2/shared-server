const chai = require('chai')
const chaihttp = require('chai-http')
var should = require('should')
var app = require('../server/index')
var server = app.listen()
chai.use(chaihttp)
var truncate = require('../scripts/db/truncate')

let freeRule = {
  'conditions': {
    'all': [{
      'fact': 'email',
      'operator': 'domainEqual',
      'value': '@comprame.com'
    }]
  },
  'event': {
    'type': 'free',
    'params': {
      'data': 0
    }
  }
}

let disabledRule = {
  'conditions': {
    'all': [{
      'fact': 'userScore',
      'operator': 'lessThan',
      'value': 0
    }]
  },
  'event': {
    'type': 'disabled',
    'params': {
      'data': null
    }
  }
}

describe('shipment cost test', function () {
  before(function (done) {
    truncate('Rules')
    done()
  })
  it('Post a free rule', function (done) {
    let jsonRule = JSON.stringify(freeRule)
    chai.request(server)
      .post('/rules')
      .send({ json: jsonRule })
      .end(function (err, res) {
        // expected: { success: true, rule: rule }
        should.equal(err, null)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rule')
        res.body.rule.should.have.property('json')
        res.body.rule.json.should.equal(jsonRule)
        setImmediate(done)
      })
  })
  it('should receive shipment cost value that is zero', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'email': 'jorge@comprame.com' })
      .end(function (err, res) {
        // expected: { status: status, cost: acum}
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.have.property('cost')
        res.body.cost.should.equal(0)
        res.body.should.have.property('status')
        res.body.status.should.equal('free')
        setImmediate(done)
      })
  })
  it('Post a disabled rule', function (done) {
    truncate('Rules')
    let jsonRule = JSON.stringify(disabledRule)
    chai.request(server)
      .post('/rules')
      .send({ json: jsonRule })
      .end(function (err, res) {
        // expected: { success: true, rule: rule }
        should.equal(err, null)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rule')
        res.body.rule.should.have.property('json')
        res.body.rule.json.should.equal(jsonRule)
        setImmediate(done)
      })
  })
  it('Negative score should receive a null shipment cost value', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'userScore': -3 })
      .end(function (err, res) {
        // expected: { status: status, cost: acum}
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.have.property('cost')
        should.equal(res.body.cost, null)
        res.body.should.have.property('status')
        res.body.status.should.equal('disabled')
        setImmediate(done)
      })
  })
  after(function (done) {
    truncate('Rules')
    server.close()
    done()
  })
})
