const chai = require('chai')
const should = require('should')
const app = require('../server/index')
const server = app.listen()
const truncate = require('../scripts/db/truncate')
const model = require('../server/models')
const httpStatus = require('http-status-codes')
const {
  freeRule,
  disabledRule,
  factorRule,
  percentageRule,
  discountRule,
  surchargeRule,
  sumRule
} = require('./shipment_cost_definitions')
chai.use(require('chai-http'))

function checkCost (err, res, expectedResult) {
  should.equal(err, null)
  res.should.have.status(httpStatus.OK)
  res.body.should.have.property('success')
  res.body.should.have.property('cost')
  const { success, cost } = res.body
  success.should.be.equal(true)
  should.equal(JSON.stringify(cost), JSON.stringify(expectedResult))
}

function addRule (rules) {
  truncate('Rules')
  rules.forEach((aRule) => {
    model.Rules.create({ json: JSON.stringify(aRule) })
  })
}

describe('shipment cost test', function () {
  it('should receive shipment cost value that is zero', function (done) {
    addRule([freeRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'email': 'jorge@comprame.com' })
      .end(function (err, res) {
        checkCost(err, res, { status: 'free', cost: 0 })
        done()
      })
  })
  it('Negative score should receive a null shipment cost value', function (done) {
    addRule([disabledRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'userScore': -3 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'disabled', cost: null })
        done()
      })
  })
  it('Should receive a shipment cost value multiple of the distance', function (done) {
    addRule([factorRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'distance': 35 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 525 })
        done()
      })
  })
  it('Disable answer must prevail', function (done) {
    addRule([freeRule, disabledRule, factorRule])
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'distance': 35
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'disabled', cost: null })
        done()
      })
  })
  it('should receive free cost because of only percentage rule', function (done) {
    addRule([percentageRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'userScore': 50 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 0 })
        done()
      })
  })
  it('Factor rule should apply first because of mayor priority', function (done) {
    addRule([percentageRule, factorRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'distance': 40, userScore: 50 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 540 })
        done()
      })
  })
  it('percentage and discount rules should apply in parallel', function (done) {
    addRule([percentageRule, factorRule, discountRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'distance': 40, 'userScore': 50 })
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 531 })
        done()
      })
  })
  it('get cost with several facts and only one rule', function (done) {
    addRule([factorRule])
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'distance': 40
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 600 })
        done()
      })
  })
  it('should get a surcharge', function (done) {
    addRule([surchargeRule])
    const facts = {
      'email': 'jorge@comprame.com',
      'userScore': -3,
      'distance': 50
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        checkCost(err, res, { status: 'enabled', cost: 10 })
        done()
      })
  })
  it('should get a sum', function (done) {
    addRule([sumRule])
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
        done()
      })
  })
  it('should apply only rules that match with facts', function (done) {
    addRule([sumRule, surchargeRule])
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
        done()
      })
  })
  it('should FAIL because of invalid type', function (done) {
    addRule([sumRule, surchargeRule])
    const facts = {
      'email': 3,
      'userScore': -3,
      'monthtrips': 12
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('should FAIL because of latitude invalid type', function (done) {
    addRule([sumRule, surchargeRule])
    const facts = {
      'latitude': '',
      'userScore': -3,
      'monthtrips': 12
    }
    chai.request(server)
      .post('/shipment-cost')
      .send(facts)
      .end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('should FAIL because of invalid posted data', function (done) {
    addRule([sumRule])
    chai.request(server)
      .post('/shipment-cost')
      .send([])
      .end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('should FAIL because of invalid tripTime', function (done) {
    addRule([sumRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'tripTime': null })
      .end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('should FAIL because of invalid userScore', function (done) {
    addRule([sumRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({ 'userScore': 'invalid' })
      .end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        done()
      })
  })
  it('should get disabled if no fact is sent', function (done) {
    // addRule([sumRule])
    chai.request(server)
      .post('/shipment-cost')
      .send({})
      .end(function (err, res) {
        checkCost(err, res, { status: 'disabled', cost: null })
        done()
      })
  })
  after(function (done) {
    truncate('Rules')
    server.close()
    done()
  })
})
