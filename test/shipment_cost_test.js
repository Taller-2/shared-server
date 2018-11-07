const chai = require('chai')
const should = require('should')
const app = require('../server/index')
const server = app.listen()
const truncate = require('../scripts/db/truncate')
const httpStatus = require('http-status-codes')
const {
  freeRule,
  disabledRule,
  factorRule,
  minPriceRule,
  percentageRule,
  discountRule,
  surchargeRule,
  sumRule
} = require('./shipment_cost_definitions')
chai.use(require('chai-http'))

function ruleCheck (err, res, jsonRule) {
  should.equal(err, null)
  res.should.have.status(httpStatus.CREATED)
  res.body.should.be.a('object')
  res.body.should.have.property('success')
  res.body.success.should.be.equal(true)
  res.body.should.have.property('rule')
  res.body.rule.should.have.property('json')
  res.body.rule.json.should.equal(jsonRule)
}

function checkCost (err, res, expectedResult) {
  if (err !== null) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('ERROR: ', err)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  }
  should.equal(err, null)
  res.should.have.status(httpStatus.OK)
  should.equal(JSON.stringify(res.body), JSON.stringify(expectedResult))
}

function postRulesVector (rules, server, done) {
  rules.forEach((aRule, idx) => {
    let jsonRule = JSON.stringify(aRule)
    chai.request(server)
      // { success: true, rule: rule }
      .post('/rules')
      .send({ json: jsonRule })
      .end(function (err, res) {
        ruleCheck(err, res, jsonRule)
        if (idx === rules.length - 1) {
          setImmediate(done)
        }
      })
  })
}

describe('shipment cost test', function () {
  // --------------------------------------------------------------------
  it('Post a free rule', function (done) {
    truncate('Rules')
    postRulesVector([freeRule], server, done)
  })
  it('should receive shipment cost value that is zero', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'email': 'jorge@comprame.com' })
      .end(function (err, res) {
        checkCost(err, res, { status: 'free', cost: 0 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post a disabled rule', function (done) {
    truncate('Rules')
    postRulesVector([disabledRule], server, done)
  })
  it('Negative score should receive a null shipment cost value', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'userScore': -3 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'disabled', cost: null })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post a factor rule', function (done) {
    truncate('Rules')
    postRulesVector([factorRule], server, done)
  })
  it('Should receive a shipment cost value multiple of the distance', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'distance': 35 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 525 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post a minimun price rule', function (done) {
    truncate('Rules')
    postRulesVector([minPriceRule], server, done)
  })
  it('should receive disable answer', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'price': 35 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'disabled', cost: null })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post several rules', function (done) {
    truncate('Rules')
    const rulesVector = [freeRule, disabledRule, factorRule, minPriceRule]
    postRulesVector(rulesVector, server, done)
  })
  it('Disable answer must prevail', function (done) {
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'distance': 35,
      'price': 35
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'disabled', cost: null })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post percentage rule', function (done) {
    truncate('Rules')
    const rulesVector = [percentageRule]
    postRulesVector(rulesVector, server, done)
  })
  it('should receive free cost because of only percentage rule', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'duration': 50 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 0 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post percentage and factor rule', function (done) {
    truncate('Rules')
    const rulesVector = [percentageRule, factorRule]
    postRulesVector(rulesVector, server, done)
  })
  it('Factor rule should apply first because of mayor priority', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'duration': 50, 'distance': 40 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 540 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post percentage, factor and discount rule', function (done) {
    truncate('Rules')
    const rulesVector = [percentageRule, factorRule, discountRule]
    postRulesVector(rulesVector, server, done)
  })
  it('percentage and discount rules should apply in parallel', function (done) {
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'duration': 50, 'distance': 40 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 531 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post only a factor', function (done) {
    truncate('Rules')
    const rulesVector = [factorRule]
    postRulesVector(rulesVector, server, done)
  })
  it('get cost with several facts and only one rule', function (done) {
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'distance': 40,
      'price': 35
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 600 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post a surcharge rule', function (done) {
    truncate('Rules')
    const rulesVector = [surchargeRule]
    postRulesVector(rulesVector, server, done)
  })
  it('should get a surcharge', function (done) {
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'duration': 50,
      'price': 35
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 10 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('Post a sum rule', function (done) {
    truncate('Rules')
    const rulesVector = [sumRule]
    postRulesVector(rulesVector, server, done)
  })
  it('should get a sum', function (done) {
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'monthtrips': 12
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 20 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  it('post unused rules', function (done) {
    truncate('Rules')
    const rulesVector = [sumRule, surchargeRule, minPriceRule]
    postRulesVector(rulesVector, server, done)
  })
  it('should apply only rules that match with facts', function (done) {
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'monthtrips': 12
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 20 })
        setImmediate(done)
      })
  })
  // --------------------------------------------------------------------
  after(function (done) {
    truncate('Rules')
    server.close()
    done()
  })
})
