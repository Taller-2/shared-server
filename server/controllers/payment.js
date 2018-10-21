const model = require('../models')
const { body } = require('express-validator/check')
const validationUtil = require('../utils/validation')

const Payments = model.Payment
const paymentMethods = ['cash', 'creditCard']
const paymentStatus = ['pending', 'approved', 'rejected']
const currencies = ['ARS', 'USD']

module.exports.findAll = function (request, response, next) {
  Payments.findAll()
    .then(payments => response.json({ success: true, payments: payments }))
    .catch(error => {
      response.json({ success: false, error: error })
    })
}

module.exports.create = function (request, response, next) {
  request.getValidationResult() // to get the result of above validate fn
    .then(validationUtil.validationHandler())
    .then(() => {
      const { transactionId, currency, amount, paymentMethod, status } = request.body
      Payments
        .create({ transactionId, currency, amount, paymentMethod, status })
        .then(user => response.status(201).json({ success: true, user: user }))
    })
    .catch(next)
}

module.exports.update = function (request, response, next) {
  console.log(request.params)
  request.getValidationResult() // to get the result of above validate fn
    .then(validationUtil.validationHandler())
    .then(() => {
      const { transactionId, status } = request.body
      Payments.update(
        { status: status },
        { where: { transactionId: transactionId } }
      ).then(() => {
        Payments.findAll()
          .then(payments => response.status(200).json({ success: true, payments: payments }))
      })
    })
    .catch(next)
}

module.exports.delete = function (request, response, next) {
  Payments.destroy({ where: { id: request.params.id } })
    .then(() => response.status(201).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
}

exports.validateCreate = () => {
  return [
    body('transactionId', 'El identificador de transaccion es requerido').exists().trim().not().isEmpty(),
    body('transactionId').custom(value => {
      return Payments.findById(value).then(payment => {
        if (payment) {
          return Promise.reject(new Error('El identificador de transaccion ya esta ingresado'))
        }
      })
    }),
    body('currency', 'Moneda invalida').exists().trim().custom((value) => currencies.includes(value)),
    body('paymentMethod', 'Metodo de pago invalido').exists().trim().custom((value) => paymentMethods.includes(value)),
    body('amount', 'Monto invalido').exists().isDecimal(),
    body('status', 'Estado del pago invalido').exists().trim().custom((value) => paymentStatus.includes(value))
  ]
}

exports.validateUpdate = () => {
  return [
    body('transactionId', 'El identificador de transaccion es requerido').exists().trim().not().isEmpty(),
    body('status', 'Estado del pago invalido').exists().trim().custom((value) => paymentStatus.includes(value))
  ]
}

module.exports.getPaymentMethods = function (request, response, next) {
  response.status(200).json({ success: true, paymentMethods: paymentMethods })
}

module.exports.getCurrencies = function (request, response, next) {
  response.status(200).json({ success: true, currencies: currencies })
}

module.exports.getPaymentStatus = function (request, response, next) {
  response.status(200).json({ success: true, paymentStatus: paymentStatus })
}
