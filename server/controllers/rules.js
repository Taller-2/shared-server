const model = require('../models')
const httpStatus = require('http-status-codes')

module.exports.findById = function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.Rules.findAll(scope)
    .then(rules => {
      if (JSON.stringify(scope) === JSON.stringify({})) {
        // here we return all the rules in a vector
        response
          .status(httpStatus.OK)
          .json({ success: true, rules: rules })
      } else {
        // here we return only one rule
        response
          .status(httpStatus.OK)
          .json({ success: true, rules: rules[0] })
      }
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.create = function (request, response, next) {
  const { json: aRule } = request.body
  if (!isRuleValid(aRule)) {
    response
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, error: 'Missing conditions' })
    return
  }
  model.Rules.create({
    json: aRule,
    enabled: false
  })
    .then(rule => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true, rule: rule })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.update = function (request, response) {
  const { json } = request.body
  model.Rules.update(
    { json: json },
    { where: { id: request.params.id } }
  )
    .then(rule => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true, rule: rule })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.delete = function (request, response) {
  model.Rules.destroy({ where: { id: request.params.id } })
    .then(() => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

const { body } = require('express-validator/check')

exports.validateCreate = () => {
  return [
    body('json', 'la regla es requerida').exists()
  ]
}

function isSingleConditionValid (singleCondition) {
  if (singleCondition.value === null) return false
  if (singleCondition.fact === null) return false
  if (singleCondition.operator === null) return false
  return true
}

function isConditionValid (conditions) {
  const booleanOp = Object.keys(conditions)[0]
  if (booleanOp === 'all' || booleanOp === 'any') {
    if (conditions[booleanOp].length === 0) return false
    for (let aCondition of conditions[booleanOp]) {
      if (!isConditionValid(aCondition)) {
        return false
      }
    }
    return true
  }
  return isSingleConditionValid(conditions)
}

const isRuleValid = function (aJsonRule) {
  if (typeof aJsonRule === 'undefined') return false
  const rule = JSON.parse(aJsonRule)
  return isConditionValid(rule.conditions)
}
