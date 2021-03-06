const model = require('../models')
const { body, param } = require('express-validator/check')
const httpStatus = require('http-status-codes')

const Shipment = model.Shipment
const Payment = model.Payment
const shipmentStatus = require('../enums/shipment_status')

module.exports.findAll = function (request, response, next) {
  Shipment.findAll()
    .then(shipments => {
      response
        .status(httpStatus.OK)
        .json({ success: true, shipments: shipments })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.create = function (request, response, next) {
  const { transactionId, address } = request.body
  Shipment
    .create({ transactionId, address, status: 'pending' })
    .then(shipment => {
      response
        .status(httpStatus.CREATED)
        .json({ success: true, shipment: shipment })
    })
    .catch(error => {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error })
    })
}

module.exports.update = function (request, response, next) {
  const { status } = request.body
  let id = request.params.id
  Shipment.findById(id).then(shipment => {
    Payment.findOne({ where: { transactionId: shipment.transactionId } }).then(payment => {
      if (payment.status === 'pending') {
        response
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ success: false, error: 'Payment was not approved yet' })
      } else if (payment.status === 'rejected' && status !== 'cancelled') {
        response
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ success: false, error: 'Payment was rejected' })
      } else {
        shipment
          .update(
            { status: status }
          )
          .then(() => {
            Shipment.findAll()
              .then(shipments => {
                response
                  .status(httpStatus.OK)
                  .json({ success: true, shipments: shipments })
              })
              .catch(error => {
                response
                  .status(httpStatus.INTERNAL_SERVER_ERROR)
                  .json({ success: false, error: error })
              })
          })
      }
    })
  })
}

module.exports.delete = function (request, response, next) {
  Shipment.destroy({ where: { id: request.params.id } })
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
    .json({ success: true, shipmentStatus: shipmentStatus })
}

exports.validateCreate = () => {
  return [
    body('transactionId').custom(value => {
      return Payment.findById(value).then(payment => {
        if (!payment) {
          return Promise.reject(new Error('El pago no existe'))
        }
      })
    }),
    body('address', 'La direccion es requerida').exists().trim()
  ]
}

exports.validateUpdate = () => {
  return [
    param('id', 'El identificador de envío es requerido').exists().trim().not().isEmpty(),
    param('id').custom(value => {
      return Shipment.findById(value).then(shipment => {
        if (!shipment) {
          return Promise.reject(new Error('El envío no existe'))
        }
      })
    }),
    body('status', 'Estado del envío invalido').exists().trim().custom((value) => shipmentStatus.includes(value))
  ]
}
