const router = require('express').Router()
const bodyParser = require('body-parser')
const shipmentCostController = require('../controllers/shipment_cost')

/*
const {
  userCharacteristics: {
    daytrips, // (int)
    monthtrips, // (int)
    antiquity  // (int)
    email, // (string)
  },
  userScore,  // (float)
  paymentMethod, // (string) [debit, credit, cash]
  shippingCharacteristics: {
    distance,  // (float) (KM)
    geographicalPosition: {
      latitude,  // (float)
      longitude // (float)
    }
  },
  tripDate, // (string: YYYY/MM/DD)
  tripTime // (string: HH:MM)
} = req.body
see also: https://github.com/Taller-2/shared-server/wiki/Development#explicacion-de-que-tipo-de-datos-recibe-el-endpoint-shipment-cost
*/

router.post('/', bodyParser.json(), shipmentCostController.getCost)

module.exports = router
