const model = require('../models')
const httpStatus = require('http-status-codes')

module.exports.findById = function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.Rules.findAll(scope)
    .then(rules => {
      if (JSON.stringify(scope) === JSON.stringify({})) {
        // here we return all the rules in a vector
        response.status(httpStatus.OK).json({ success: true, rules: rules })
      } else {
        // here we return only one rule
        response.status(httpStatus.OK).json({ success: true, rules: rules[0] })
      }
    })
    .catch(error => {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
    })
}

module.exports.create = function (request, response, next) {
  const { json: aRule } = request.body
  const rule = JSON.parse(aRule)
  if (!ruleIsValid(rule.conditions)) {
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
  /*
  let clientError = false
  request.getValidationResult()
    .then(validationHandler())
    .then(() => {
      const { json: aRule } = request.body
      const rule = JSON.parse(aRule)
      if (!ruleIsValid(rule.conditions)) {
        response
          .status(httpStatus.BAD_REQUEST)
          .json({ success: false, error: 'Missing conditions' })
        clientError = true
      }
      if (clientError) return
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
          response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
        })
    })
    .catch(next)
    */
}

module.exports.update = function (request, response) {
  const { json } = request.body
  model.Rules.update(
    { json: json },
    { where: { id: request.params.id } }
  )
    .then(rule => response.status(httpStatus.CREATED).json({ success: true, rule: rule }))
    .catch(error => {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
    })
}

module.exports.delete = function (request, response) {
  model.Rules.destroy({ where: { id: request.params.id } })
    .then(() => response.status(httpStatus.CREATED).json({ success: true }))
    .catch(error => {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
    })
}

module.exports.deleteAll = function (request, response) {
  model.Rules.destroy({
    where: {},
    force: true
  })
    .then(() => response.status(httpStatus.CREATED).json({ success: true }))
    .catch(error => {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
    })
}

const { body } = require('express-validator/check')

exports.validateCreate = () => {
  return [
    body('json', 'la regla es requerida').exists()
  ]
}
/*
const validationHandler = next => result => {
  if (result.isEmpty()) return
  if (!next) {
    throw new Error(JSON.stringify(result.array()))
  } else {
    return next(new Error(JSON.stringify(result.array())))
  }
}
*/
function isSingleConditionValid (singleCondition) {
  if (singleCondition.value === null) return false
  if (singleCondition.fact === null) return false
  if (singleCondition.operator === null) return false
  return true
}

const ruleIsValid = function (conditions) {
  const booleanOp = Object.keys(conditions)[0]
  if (booleanOp === 'all' || booleanOp === 'any') {
    if (conditions[booleanOp].length === 0) return false
    for (let aCondition of conditions[booleanOp]) {
      if (!ruleIsValid(aCondition)) {
        return false
      }
    }
    return true
  }
  return isSingleConditionValid(conditions)
}
