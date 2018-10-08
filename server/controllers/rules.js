const model = require('../models')

module.exports.findById = function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.Rules.findAll(scope)
    .then(rules => {
      if (JSON.stringify(scope) === JSON.stringify({})) {
        // here we return all the rules in a vector
        response.json({ success: true, rules: rules })
      } else {
        // here we return only one rule
        response.json({ success: true, rules: rules[0] })
      }
    })
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.create = function (request, response, next) {
  request.getValidationResult()
    .then(validationHandler())
    .then(() => {
      const { json: aRule } = request.body
      model.Rules.create({
        json: aRule,
        enabled: false
      })
        .then(rule => response.status(201).json({ success: true, rule: rule }))
    })
    .catch(next)
}

module.exports.update = function (request, response) {
  const { json } = request.body
  model.Rules.update(
    { json: json },
    { where: { id: request.params.id } }
  )
    .then(rule => response.status(201).json({ success: true, rule: rule }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.delete = function (request, response) {
  model.Rules.destroy({ where: { id: request.params.id } })
    .then(() => response.status(201).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.deleteAll = function (request, response) {
  model.Rules.destroy({
    where: {},
    force: true
  })
    .then(() => response.status(201).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
}

const { body } = require('express-validator/check')

exports.validateCreate = () => {
  return [
    body('json', 'la regla es requerida').exists()
  ]
}

const validationHandler = next => result => {
  if (result.isEmpty()) return
  if (!next) {
    throw new Error(JSON.stringify(result.array()))
  } else {
    return next(new Error(JSON.stringify(result.array())))
  }
}
