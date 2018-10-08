const router = require('express').Router()
const paymentController = require('../controllers/payment')
const authUtils = require('../middlewares/auth')

router.use(authUtils.requireAuth)

router.post('/', paymentController.validateCreate(), paymentController.create)

router.get('/', paymentController.findAll)

router.put('/:id', paymentController.validateUpdate(), paymentController.update)

router.delete('/:id', paymentController.delete)

router.get('/paymentMethods/', paymentController.getPaymentMethods)

router.get('/currencies/', paymentController.getCurrencies)

router.get('/status/', paymentController.getPaymentStatus)

module.exports = router
