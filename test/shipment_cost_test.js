const chai = require('chai')
const should = require('should')
const app = require('../server/index')
const server = app.listen()
const truncate = require('../scripts/db/truncate')
const req = require('./request')
const {
  freeRule,
  disabledRule,
  factorRule,
  minPriceRule,
  percentageRule,
  discountRule
} = require('./data_definitions')
chai.use(require('chai-http'))

function ruleCheck (err, res, jsonRule) {
  should.equal(err, null)
  res.should.have.status(201)
  res.body.should.be.a('object')
  res.body.should.have.property('success')
  res.body.success.should.be.equal(true)
  res.body.should.have.property('rule')
  res.body.rule.should.have.property('json')
  res.body.rule.json.should.equal(jsonRule)
}

function costCheck (err, res, status, cost) {
  should.equal(err, null)
  res.should.have.status(200)
  res.body.should.have.property('cost')
  should.equal(res.body.cost, cost)
  res.body.should.have.property('status')
  res.body.status.should.equal(status)
}

function postRulesVector (rules, server) {
  rules.map((aRule, idx) => {
    let jsonRule = JSON.stringify(aRule)
    req.post((err, res) => {
      ruleCheck(err, res, jsonRule)
    }, server, { json: jsonRule }, '/rules')
  })
}

describe('shipment cost test', function () {
  // --------------------------------------------------------------------
  it('Post a free rule', function (done) {
    truncate('Rules')
    postRulesVector([freeRule], server)
    setImmediate(done)
  })
  it('should receive shipment cost value that is zero', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'free', 0)
    }, server, { 'email': 'jorge@comprame.com' }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post a disabled rule', function (done) {
    truncate('Rules')
    postRulesVector([disabledRule], server)
    setImmediate(done)
  })
  it('Negative score should receive a null shipment cost value', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'disabled', null)
    }, server, { 'userScore': -3 }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post a factor rule', function (done) {
    truncate('Rules')
    postRulesVector([factorRule], server)
    setImmediate(done)
  })
  it('Should receive a shipment cost value multiple of the distance', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'enabled', 525)
    }, server, { 'distance': 35 }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post a minimun price rule', function (done) {
    truncate('Rules')
    postRulesVector([minPriceRule], server)
    setImmediate(done)
  })
  it('should receive disable answer', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'disabled', null)
    }, server, { 'price': 35 }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post several rules', function (done) {
    truncate('Rules')
    const rulesVector = [freeRule, disabledRule, factorRule, minPriceRule]
    postRulesVector(rulesVector, server)
    setImmediate(done)
  })
  it('Disable answer must prevail', function (done) {
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'distance': 35,
      'price': 35
    }
    req.post((err, res) => {
      costCheck(err, res, 'disabled', null)
    }, server, facts, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post percentage rule', function (done) {
    truncate('Rules')
    const rulesVector = [percentageRule]
    postRulesVector(rulesVector, server)
    setImmediate(done)
  })
  it('should receive free cost because of only percentage rule', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'enabled', 0)
    }, server, { 'duration': 50 }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post percentage and factor rule', function (done) {
    truncate('Rules')
    const rulesVector = [percentageRule, factorRule]
    postRulesVector(rulesVector, server)
    setImmediate(done)
  })
  it('Factor rule should apply first because of mayor priority', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'enabled', 36)
    }, server, { 'duration': 50, 'distance': 40 }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  it('Post percentage, factor and discount rule', function (done) {
    truncate('Rules')
    const rulesVector = [percentageRule, factorRule, discountRule]
    postRulesVector(rulesVector, server)
    setImmediate(done)
  })
  it('percentage and discount rules should apply in parallel', function (done) {
    req.post((err, res) => {
      costCheck(err, res, 'enabled', 26)
    }, server, { 'duration': 50, 'distance': 40 }, '/shipment-cost')
    setImmediate(done)
  })
  // --------------------------------------------------------------------
  after(function (done) {
    truncate('Rules')
    server.close()
    done()
  })
})
