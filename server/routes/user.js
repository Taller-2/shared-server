const router = require('express').Router()
const userController = require('../controllers/user')
const authUtils = require('../middlewares/auth')
const requireAuth = authUtils.requireAuth

router.post('/', userController.validateCreate(), userController.create)

router.get('/:id?', requireAuth, userController.findById)

router.put('/:id', requireAuth, userController.update)

router.delete('/:id', requireAuth, userController.delete)

module.exports = router
