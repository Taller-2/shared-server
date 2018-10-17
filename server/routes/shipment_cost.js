const router = require('express').Router()
const bodyParser = require('body-parser')
const shipmentCostController = require('../controllers/shipment_cost')
const authUtils = require('../middlewares/auth')
router.use(authUtils.requireAuth)

/*
const {
  userCharacteristics: {
    daytrips, // (int)
    monthtrips, // (int)
    antiquity  // (int)
    email, // (string)
  },
  userScore,  // (float)
  paymentMethod, // (string)
  price, // (float)
  shippingCharacteristics: {
    duration,  // (float)
    distance,  // (float)
    geographicalPosition: {
      latitud,  // (float)
      longitud // (float)
    },
    date, // (string: YYYY/MM/DD)
    time // (string: HH:MM)
  },
  serverId, // (int)
  tripDate, // (string: YYYY/MM/DD)
  tripTime // (string: HH:MM)
} = req.body
  */

router.post('/', bodyParser.json(), shipmentCostController.getCost)

module.exports = router
