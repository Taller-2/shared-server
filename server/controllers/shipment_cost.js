let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine
var db = require('../models')
var multimethod = require('multimethod')

var formula = multimethod().dispatch(function (event, data) { return event.type })
formula.when('percentage', function (event, data) {
  return -event.params.data * data.price
})
formula.when('factor', function (event, data) {
  return {
    status: 'enabled',
    value: event.params.data * data[event.params.fact]
  }
})
formula.when('sum', function (event, data) {
  return {
    status: 'enabled',
    value: event.params.data
  }
})
formula.when('discount', function (event, data) {
  return {
    status: 'enabled',
    value: -event.params.data
  }
})
formula.when('surcharge', function (event, data) {
  return {
    status: 'enabled',
    value: event.params.data
  }
})
formula.when('free', function (event, data) {
  return {
    status: 'free',
    value: event.params.data
  }
})
formula.when('disabled', function (event, data) {
  return {
    status: 'disabled',
    value: event.params.data
  }
})

function getStatus (array) {
  var status = 'enabled'
  array.map((res, idx) => {
    if (res.status === 'free' && status !== 'disabled') {
      status = res.status
    } else if (res.status === 'disabled') {
      status = res.status
    }
  })
  return status
}

var getResult = multimethod().dispatch(function (array) { return getStatus(array) })
getResult.when('free', function (array) {
  return { status: 'free', cost: 0 }
})
getResult.when('disabled', function (array) {
  return { status: 'disabled', cost: null }
})
getResult.when('enabled', function (array) {
  var acum = 0
  array.map((data, idx) => {
    acum += data.value
  })
  return { status: 'enabled', cost: acum }
})

function domainEqual (emailFact, value) {
  const domain = '@' + emailFact.split('@')[1]
  if (domain === value) {
    return true
  }
  return false
}

function addRules (rules) {
  let engine = new Engine()
  engine.addOperator('domainEqual', domainEqual)
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
    array = triggeredEvents.map(event => (formula(event, facts)))
    res.send(getResult(array))
  }).catch((err) => res.send({ message: 'ERROR: ' + err }))
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
