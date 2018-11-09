const router = require('express').Router()
const rulesController = require('../controllers/rules')
const validation = require('../middlewares/validation')

router.get('/:id?', rulesController.findById)

router.post('/', rulesController.validateCreate(), validation.validationHandler, rulesController.create)

router.put('/:id', rulesController.update)

router.delete('/:id', rulesController.delete)

module.exports = router
