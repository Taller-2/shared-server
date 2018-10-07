const router = require('express').Router()
const appServerController = require('../controllers/app_server')
const authUtils = require('../middlewares/auth')

router.use(authUtils.requireAuth)

router.get('/', appServerController.findAll)

router.delete('/:id', appServerController.delete)

router.post('/', appServerController.create)

module.exports = router
