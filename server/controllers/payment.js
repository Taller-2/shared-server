const model = require('../models')
const { body, param } = require('express-validator/check')
const httpStatus = require('http-status-codes')

const Payments = model.Payment
const paymentMethods = require('../enums/payment_method')
const paymentStatus = require('../enums/payment_status')
const currencies = require('../enums/currency')

module.exports.findAll = function (request, response, next) {
  Payments.findAll()
    .then(payments => {
      response
        .status(httpStatus.OK)
        .json({ success: true, payments: payments })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.create = function (request, response, next) {
  const { amount, paymentMethod, purchaseID } = request.body
  Payments
    .create({
      currency: 'ARS',
      status: 'pending',
      amount,
      paymentMethod,
      purchaseID
    })
    .then(payment => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true, payment: payment })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.update = function (request, response, next) {
  const { transactionId, status } = request.body
  Payments.update(
    { status: status },
    { where: { transactionId: transactionId } }
  ).then(() => {
    Payments.findAll()
      .then(payments => {
        response
          .status(httpStatus.OK)
          .json({ success: true, payments: payments })
      })
      .catch(error => {
        response
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, error: error })
      })
  })
}

module.exports.delete = function (request, response, next) {
  Payments.destroy({ where: { transactionId: request.params.transactionId } })
    .then((amount) => {
      response
        .status(httpStatus.OK)
        .json({ success: (amount > 0) })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.getUIEnums = function (request, response, next) {
  response
    .status(httpStatus.OK)
    .json({
      success: true,
      paymentMethods: paymentMethods,
      currencies: currencies,
      paymentStatus: paymentStatus
    })
}

exports.validateCreate = () => {
  return [
    body('paymentMethod', 'Metodo de pago invalido').exists().trim().custom((value) => paymentMethods.includes(value)),
    body('amount', 'Monto invalido').exists().isDecimal()
  ]
}

exports.validateUpdate = () => {
  return [
    param('transactionId', 'El identificador de transaccion es requerido').exists().trim().not().isEmpty(),
    param('transactionId').custom(value => {
      return Payments.findById(value).then(payment => {
        if (!payment) {
          return Promise.reject(new Error('El pago no existe'))
        }
      })
    }),
    body('status', 'Estado del pago invalido').exists().trim().custom((value) => paymentStatus.includes(value))
  ]
}
