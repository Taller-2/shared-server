const bcrypt = require('bcrypt')
const model = require('../models')

module.exports.findById = function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.User.findAll(scope)
    .then(users => response.json({ success: true, users: users }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.create = function (request, response) {
  const { name, email, pass } = request.body

  model.User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(pass, 10),
    enabled: false
  })
    .then(user => response.status(201).json({ success: true, user: user }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.update = function (request, response) {
  const { name, email } = request.body
  model.User.update(
    { name: name, email: email },
    { where: { id: request.params.id } }
  )
    .then(user => response.status(201).json({ success: true, user: user }))
    .catch(error => response.json({ success: false, error: error }))
}

module.exports.delete = function (request, response) {
  model.User.destroy({ where: { id: request.params.id } })
    .then(() => response.status(201).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
}
