const chai = require('chai')
const chaihttp = require('chai-http')
var should = require('should')
var app = require('../server/index')
var server = app.listen()
var truncate = require('../server/models/truncate')
chai.use(chaihttp)

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

describe('add simple rule', function () {
  before(function (done) {
    truncate('Rules')
    done()
  })
  it('should save a rule in data base and receive success message', function (done) {
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
  after(function (done) {
    server.close()
    done()
  })
})
