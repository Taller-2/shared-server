const router = require('express').Router()
const appServerController = require('../controllers/app_server')

router.get('/', appServerController.findAll)

router.delete('/:id', appServerController.delete)

router.post('/', appServerController.create)

module.exports = router
