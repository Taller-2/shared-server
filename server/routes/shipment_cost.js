const router = require('express').Router()
const bodyParser = require('body-parser')
// const addRules = require('../rules/shipment_cost_rules')
// var model = require('../controllers/rules')
let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine

function runRules (engine, facts, res) {
  let array
  engine.run(facts).then(triggeredEvents => {
    // engine returns a list of events with truthy conditions
    array = triggeredEvents.map(
      event => ({ message: event.params.data }))
    res.send(array)
  }).catch(() => res.send({ message: 'test_rule failed' }))
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
  let rule1 = {
    'conditions': {
      'all': [{
        'fact': 'test_rule',
        'operator': 'equal',
        'value': true
      }]
    },
    'event': {
      'type': 'test',
      'params': {
        'data': 0
      }
    }
  }
  // let response
  // model.findAll(response)
  // let jsonRules = response.rules
  let engine = new Engine()
  engine.addRule(new Rule(rule1)) // addRules(jsonRules)
  let facts = req.body
  runRules(engine, facts, res)
})

module.exports = router
