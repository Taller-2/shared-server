const model = require('../models')
const httpStatus = require('http-status-codes')

module.exports.findAll = function (request, response) {
  model.AppServer
    .findAll()
    .then(servers => response.json({ success: true, servers: servers }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.delete = function (request, response) {
  model.AppServer
    .destroy({ where: { id: request.params.id } })
    .then(() => response.status(httpStatus.OK).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.create = function (request, response) {
  const { name, secret, url } = request.body
  model.AppServer
    .create({ name: name, secret: secret, url: url })
    .then(server => response.status(httpStatus.CREATED).json({ success: true, server: server }))
    .catch(error => response.json({ success: false, error: error }))
}
