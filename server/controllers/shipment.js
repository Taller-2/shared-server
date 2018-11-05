const model = require('../models')
const { body, param } = require('express-validator/check')
const httpStatus = require('http-status-codes')

const Shipment = model.Shipment
const shipmentStatus = require('../enums/shipment_status')

module.exports.findAll = function (request, response, next) {
  Shipment.findAll()
    .then(shipments => response.json({ success: true, shipments: shipments }))
    .catch(error => { response.json({ success: false, error: error }) })
}

module.exports.create = function (request, response, next) {
  const { address, transactionId, status } = request.body
  Shipment
    .create({ address, transactionId, status })
    .then(shipment => response.status(httpStatus.CREATED).json({ success: true, shipment: shipment }))
}

module.exports.update = function (request, response, next) {
  const { id, status } = request.body
  Shipment.update(
    { status: status },
    { where: { id: id } }
  ).then(() => {
    Shipment.findAll()
      .then(shipments => response.status(httpStatus.OK).json({ success: true, shipments: shipments }))
  })
}

module.exports.delete = function (request, response, next) {
  Shipment.destroy({ where: { id: request.params.id } })
    .then((amount) => response.status(httpStatus.OK).json({ success: (amount > 0) }))
    .catch(error => response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error }))
}

module.exports.getUIEnums = function (request, response, next) {
  response.status(httpStatus.OK).json({ success: true, shipmentStatus: shipmentStatus })
}

exports.validateCreate = () => {
  return [
    body('transactionId', 'El identificador de envío debe ser numérico').isInt(),
    body('address', 'La direccion es requerida').exists().trim(),
    body('status', 'Estado del envío invalido').exists().trim().custom((value) => shipmentStatus.includes(value))
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
