let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine
var db = require('../models')

function addRules (rules) {
  let engine = new Engine()
  const length = rules.length
  for (var i = 0; i < length; i++) {
    engine.addRule(new Rule(rules[i].json))
  }
  return engine
}

function runRules (engine, facts, res) {
  let array
  engine.run(facts).then(triggeredEvents => {
    // engine returns a list of events with truthy conditions
    array = triggeredEvents.map(event => ({ message: event.params.data }))
    res.send(array)
  }).catch(() => res.send({ message: 'test_rule failed' }))
}

module.exports.getCost = async function (req, res) {
  let rulesVector = null
  await db.Rules.findAll({ raw: true })
    .then(rules => {
      rulesVector = rules
    })
    .catch(error => (res.send({ success: false, error: error })))
  let engine = addRules(rulesVector)
  let facts = req.body
  runRules(engine, facts, res)
}
