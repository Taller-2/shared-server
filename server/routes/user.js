const router = require('express').Router()
const model = require('../models')

router.get('/:id?', function (request, response) {
  let scope = request.params.id ? { where: { id: request.params.id } } : {}
  model.User.findAll(scope)
    .then(users => response.json({ success: true, users: users }))
    .catch(error => response.json({ success: false, error: error }))
})

router.post('/', function (request, response) {
  const { name, email } = request.body
  model.User.create({ name: name, email: email })
    .then(user => response.status(201).json({ success: true, user: user }))
    .catch(error => response.json({ success: false, error: error }))
})

router.put('/:id', function (request, response) {
  const { name, email } = request.body
  model.User.update(
    { name: name, email: email },
    { where: { id: request.params.id } }
  )
    .then(user => response.status(201).json({ success: true, user: user }))
    .catch(error => response.json({ success: false, error: error }))
})

router.delete('/:id', function (request, response) {
  model.User.destroy({ where: { id: request.params.id } })
    .then(_ => response.status(201).json({ success: true }))
    .catch(error => response.json({ success: false, error: error }))
})

module.exports = router
