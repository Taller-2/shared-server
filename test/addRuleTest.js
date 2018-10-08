const chai = require('chai')
const chaihttp = require('chai-http')
var should = require('should')
var app = require('../server/index')
var server = app.listen()
var truncate = require('../scripts/db/truncate')
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
  var id
  it('should get vector of rules', function (done) {
    let jsonRule = JSON.stringify(rule)
    chai.request(server)
      .get('/rules')
      .end(function (err, res) {
        // expected: { success: true, rules: rules }
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rules')
        res.body.rules.should.have.length(1)
        res.body.rules[0].should.have.property('json')
        res.body.rules[0].json.should.equal(jsonRule)
        id = res.body.rules[0].id
        setImmediate(done)
      })
  })
  it('should get a rule by id', function (done) {
    let jsonRule = JSON.stringify(rule)
    chai.request(server)
      .get('/rules/' + id.toString())
      .end(function (err, res) {
        // expected: { success: true, rules: rules }
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rules')
        res.body.rules.should.have.property('json')
        res.body.rules.json.should.equal(jsonRule)
        setImmediate(done)
      })
  })
  after(function (done) {
    server.close()
    done()
  })
})
