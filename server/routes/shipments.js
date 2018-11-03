const router = require('express').Router()
const shipmentController = require('../controllers/shipment')
const authUtils = require('../middlewares/auth')
const validation = require('../middlewares/validation')

router.use(authUtils.requireAuth)

router.post('/', shipmentController.validateCreate(), validation.validationHandler, shipmentController.create)

router.get('/', shipmentController.findAll)

router.put('/:id', shipmentController.validateUpdate(), validation.validationHandler, shipmentController.update)

router.delete('/:id', shipmentController.delete)

router.get('/ui-enums/', shipmentController.getUIEnums)

module.exports = router
