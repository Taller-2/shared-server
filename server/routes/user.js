const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/:id?', userController.findById)

router.post('/', userController.validateCreate(), userController.create)

router.put('/:id', userController.update)

router.delete('/:id', userController.delete)

module.exports = router
