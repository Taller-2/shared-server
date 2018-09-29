const router = require('express').Router()
const bodyParser = require('body-parser')
const engine = require('../rules/shipment_cost_rules')

router.post('/', bodyParser.json(), function (req, res) {
  /*
  const {
    userCharacteristics: {
      daytrips, // (int)
      monthtrips, // (int)
      antiquity  // (int)
    },
    userScore,  // (float)
    paymentMethod, // (string)
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
  let facts = { test_rule: true }
  let array
  engine.run(facts).then(triggeredEvents => {
    // engine returns a list of events with truthy conditions
    array = triggeredEvents.map(
      event => ({ message: event.params.data }))
    res.send(array)
  }).catch(() => res.send({ message: 'test_rule failed' }))
})

module.exports = router
