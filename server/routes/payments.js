const router = require('express').Router()
const paymentController = require('../controllers/payment')
const authUtils = require('../middlewares/auth')
const validation = require('../middlewares/validation')

router.use(authUtils.requireAuth)

router.post('/', paymentController.validateCreate(), validation.validationHandler, paymentController.create)

router.get('/', paymentController.findAll)

router.get('/status-for-purchase/:purchaseId', paymentController.statusForPurchase)

router.put('/:transactionId', paymentController.validateUpdate(), validation.validationHandler, paymentController.update)

router.delete('/:transactionId', paymentController.delete)

router.get('/ui-enums/', paymentController.getUIEnums)

module.exports = router
