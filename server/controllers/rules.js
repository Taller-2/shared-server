const model = require('../models')

module.exports.findById = function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.Rules.findAll(scope)
    .then(rules => response.json({ success: true, rules: rules }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.findAll = function (request, response) {
  model.Rules.findAll()
    .then(rules => response.json({ success: true, rules: rules }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.create = function (request, response, next) {
  request.getValidationResult() // to get the result of above validate fn
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
