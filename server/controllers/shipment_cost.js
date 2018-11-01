let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine
let db = require('../models')
let multimethod = require('multimethod')
const httpStatus = require('http-status-codes')

const priorities = {
  'disabled': 7,
  'free': 6,
  'factor': 5,
  'sum': 4,
  'surcharge': 3,
  'discount': 2,
  'percentage': 1
}

function addPriority (rule) {
  rule.priority = priorities[rule.event.type]
  return rule
}

let formula = multimethod().dispatch(function (event, data, cost) { return event.type })
formula.when('percentage', function (event, data, cost) {
  cost.cost -= (event.params.data * (cost.cost / 100))
  return 'enabled'
})
formula.when('factor', function (event, data, cost) {
  const factor = event.params.data * data[event.params.fact]
  cost.cost += factor
  return 'enabled'
})
formula.when('sum', function (event, data, cost) {
  const sum = event.params.data
  cost.cost += sum
  return 'enabled'
})
formula.when('discount', function (event, data, cost) {
  cost.cost -= event.params.data
  return 'enabled'
})
formula.when('surcharge', function (event, data, cost) {
  const surcharge = event.params.data
  cost.cost += surcharge
  return 'enabled'
})
formula.when('free', function (event, data, cost) {
  return 'free'
})
formula.when('disabled', function (event, data, cost) {
  return 'disabled'
})

function getStatus (eventAnswers) {
  // Recibo una array de cada respuesta de cada evento. cuando aplico la formula por cada
  // regla aplicada (evento) devuelvo una respuesta con este formato:
  // { status: aState, value: aValue }
  let status = 'enabled'
  eventAnswers.forEach((aStatus) => {
    if (aStatus === 'free' && status !== 'disabled') {
      status = aStatus
    } else if (aStatus === 'disabled') {
      status = aStatus
    }
  })
  return status
}

let getResult = multimethod().dispatch(function (array, cost) { return getStatus(array) })
getResult.when('free', function (array, cost) {
  return { status: 'free', cost: 0 }
})
getResult.when('disabled', function (array, cost) {
  return { status: 'disabled', cost: null }
})
getResult.when('enabled', function (array, cost) {
  return { status: 'enabled', cost: cost }
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
  for (let i = 0; i < length; i++) {
    let aRule = JSON.parse(rules[i].json)
    aRule = addPriority(aRule)
    aRule = JSON.stringify(aRule)
    engine.addRule(new Rule(aRule))
  }
  return engine
}

function runRules (engine, facts, res) {
  let array
  engine.run(facts).then(triggeredEvents => {
    // engine returns a list of events with truthy conditions
    let cost = { cost: 0 }
    array = triggeredEvents.map(event => (formula(event, facts, cost)))
    res.status(httpStatus.OK)
    res.send(getResult(array, cost.cost))
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
