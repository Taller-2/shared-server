const model = require('../models')

module.exports.findAll = function (request, response) {
  model.AppServer
    .findAll()
    .then(servers => response.json({ success: true, servers: servers }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.delete = function (request, response) {
  model.AppServer
    .destroy({ where: { id: request.params.id } })
    .then(() => response.status(201).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.create = function (request, response) {
  const { name, url } = request.body
  model.AppServer
    .create({ name: name, url: url })
    .then(server => response.status(201).json({ success: true, server: server }))
    .catch(error => response.json({ success: false, error: error }))
}
