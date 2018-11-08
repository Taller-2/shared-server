const chai = require('chai')
const should = require('should')
const app = require('../server/index')
const server = app.listen()
const truncate = require('../scripts/db/truncate')
const httpStatus = require('http-status-codes')
const model = require('../server/models')
chai.use(require('chai-http'))
const {
  normalRule,
  emptyConditionRule,
  missingConditionRule
} = require('./rules_definitions')

const baseURL = '/rules'

describe('add simple rule', function () {
  before(async () => { return truncate('Rules') })
  after(async () => { return truncate('Rules') })

  it('should save a rule in data base and receive success message', function (done) {
    let jsonRule = JSON.stringify(normalRule)
    chai.request(server)
      .post(baseURL)
      .send({ json: jsonRule })
      .end(function (err, res) {
        // expected: { success: true, rule: rule }
        should.equal(err, null)
        res.should.have.status(httpStatus.CREATED)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rule')
        res.body.rule.should.have.property('json')
        res.body.rule.json.should.equal(jsonRule)
        done()
      })
  })

  let id
  it('should get vector of rules', function (done) {
    let jsonRule = JSON.stringify(normalRule)
    chai.request(server)
      .get(baseURL)
      .end(function (err, res) {
        // expected: { success: true, rules: rules }
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rules')
        res.body.rules.should.have.length(1)
        res.body.rules[0].should.have.property('json')
        res.body.rules[0].json.should.equal(jsonRule)
        id = res.body.rules[0].id
        done()
      })
  })

  it('should get a rule by id', function (done) {
    let jsonRule = JSON.stringify(normalRule)
    chai.request(server)
      .get(`${baseURL}/${id}`)
      .end(function (err, res) {
        // expected: { success: true, rules: rules }
        should.equal(err, null)
        res.should.have.status(httpStatus.OK)
        res.body.should.have.property('success')
        res.body.success.should.be.equal(true)
        res.body.should.have.property('rules')
        res.body.rules.should.have.property('json')
        res.body.rules.json.should.equal(jsonRule)
        done()
      })
  })

  it('test empty rule', function (done) {
    let jsonRule = JSON.stringify(emptyConditionRule)
    chai.request(server)
      .post('/rules')
      .send({ json: jsonRule })
      .end(function (err, res) {
        // expected: { success: true, rule: rule }
        should.equal(err, null)
        res.should.have.status(httpStatus.BAD_REQUEST)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        res.body.should.have.property('error')
        done()
      })
  })
  it('should get error by requesting invalid id', function (done) {
    chai.request(server)
      .get(`${baseURL}/${'invalid'}`)
      .end(function (err, res) {
        // expected: { success: true, rules: rules }
        should.equal(err, null)
        res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR)
        res.body.should.have.property('success')
        res.body.should.have.property('error')
        const { success } = res.body
        success.should.be.equal(false)
        done()
      })
  })
  it('test missing conditions rule', function (done) {
    let jsonRule = JSON.stringify(missingConditionRule)
    chai.request(server)
      .post('/rules')
      .send({ json: jsonRule })
      .end(function (err, res) {
        // expected: { success: true, rule: rule }
        should.equal(err, null)
        res.should.have.status(httpStatus.BAD_REQUEST)
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.success.should.be.equal(false)
        res.body.should.have.property('error')
        done()
      })
  })
  it('delete rule', function (done) {
    const aRule = { json: JSON.stringify(normalRule) }
    model.Rules
      .create(aRule)
      .then(instance => {
        chai
          .request(server)
          .delete(`${baseURL}/${instance.id}`)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.CREATED)
            res.body.should.have.property('success')
            const { success } = res.body
            success.should.be.equal(true)
            done()
          })
      })
  })
  it('delete invalid id rule', function (done) {
    chai
      .request(server)
      .delete(`${baseURL}/${'invalid'}`)
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR)
        res.body.should.have.property('success')
        res.body.should.have.property('error')
        const { success } = res.body
        success.should.be.equal(false)
        done()
      })
  })
  it('add empty rule', function (done) {
    chai
      .request(server)
      .post(baseURL)
      .send({})
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.BAD_REQUEST)
        res.body.should.have.property('success')
        res.body.should.have.property('error')
        const { success } = res.body
        success.should.be.equal(false)
        done()
      })
  })
  it('Updates a rule', (done) => {
    const body = { json: JSON.stringify(normalRule) }
    model.Rules
      .create(body)
      .then(instance => {
        chai
          .request(server)
          .put(`${baseURL}/${instance.id}`)
          .send(body)
          .end((err, res) => {
            should.equal(err, null)
            res.should.have.status(httpStatus.CREATED)
            res.body.success.should.be.equal(true)
            done()
          })
      })
  })
  it('should get error by updating an invalid id rule', (done) => {
    chai
      .request(server)
      .put(`${baseURL}/${'invalid'}`)
      .send({ json: JSON.stringify(normalRule) })
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR)
        res.body.success.should.be.equal(false)
        done()
      })
  })
})
