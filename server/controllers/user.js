const bcrypt = require('bcrypt')
const model = require('../models')
const httpStatus = require('http-status-codes')
const { body } = require('express-validator/check')

module.exports.findById = function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.User.findAll(scope)
    .then(users => {
      response
        .status(httpStatus.OK)
        .json({ success: true, users: users })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, errors: error })
    })
}

module.exports.create = function (request, response, next) {
  const { name, email, pass } = request.body

  model.User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(pass, 10),
    enabled: false
  })
    .then(user => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true, user: user })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, errors: error })
    })
}

module.exports.update = function (request, response) {
  const { name, email } = request.body
  model.User.update(
    { name: name, email: email },
    { where: { id: request.params.id } }
  )
    .then(user => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true, user: user })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, errors: error })
    })
}

module.exports.delete = function (request, response) {
  model.User.destroy({ where: { id: request.params.id } })
    .then(() => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, errors: error })
    })
}

exports.validateCreate = () => {
  return [
    body('name', 'El nombre de usuario es requerido').trim().not().isEmpty(),
    body('email', 'El email es invalido').trim().isEmail().normalizeEmail().custom(value => {
      return model.User.findByEmail(value).then(user => {
        if (user) {
          return Promise.reject(new Error('El email ya se encuentra registrado'))
        }
      })
    }),
    body('pass', 'La contraseña es muy corta').isLength({ min: 6 })
  ]
}
