const chai = require('chai')
const chaihttp = require('chai-http')
var should = require('should')
var app = require('../server/index')
var server = app.listen()
chai.use(chaihttp)
var truncate = require('../scripts/db/truncate')

let rule = {
  'conditions': {
    'all': [{
      'fact': 'test_rule',
      'operator': 'equal',
      'value': true
    }]
  },
  'event': {
    'type': 'test',
    'params': {
      'data': 0
    }
  }
}

describe('shipment cost test', function () {
  before(function (done) {
    truncate('Rules')
    done()
  })
  it('Post a rule', function (done) {
    let jsonRule = JSON.stringify(rule)
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
