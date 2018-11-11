const router = require('express').Router()
const validation = require('../middlewares/validation')
const shipmentCostController = require('../controllers/shipment_cost')

/*
const {
  daytrips, // (int)
  monthtrips, // (int)
  antiquity  // (int)
  email, // (string)
  userScore,  // (float)
  paymentMethod, // (string) [debit, credit, cash]
  distance,  // (float) (KM)
  latitude,  // (float)
  longitude // (float)
  tripDate, // (string: YYYY/MM/DD)
  tripTime // (string: HH:MM)
} = req.body
see also: https://github.com/Taller-2/shared-server/wiki/Development#explicacion-de-que-tipo-de-datos-recibe-el-endpoint-shipment-cost
*/

router.post(
  '/',
  shipmentCostController.validateCreate(),
  validation.validationHandler,
  shipmentCostController.getCost
)

module.exports = router
