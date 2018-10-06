const router = require('express').Router()
const bodyParser = require('body-parser')
const addRules = require('../rules/shipment_cost_rules')
var db = require('../models')

function runRules (engine, facts, res) {
  let array
  engine.run(facts).then(triggeredEvents => {
    // engine returns a list of events with truthy conditions
    array = triggeredEvents.map(event => ({ message: event.params.data }))
    res.send(array)
  }).catch(() => res.send({ message: 'test_rule failed' }))
}

async function getRules (req, res) {
  let response = null
  await db.Rules.findAll({ raw: true })
    .then(rules => {
      response = rules
    })
    .catch(error => {
      throw error.message
    })
  let engine = addRules(response)
  let facts = req.body
  runRules(engine, facts, res)
}

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
  getRules(req, res)
})

module.exports = router
