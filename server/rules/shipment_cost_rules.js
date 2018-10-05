// 'use strict'

let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine

module.exports = function addRules (jsonRules) {
  let engine = new Engine()
  let rules = []
  for (const aRule in jsonRules) {
    rules.push(new Rule(aRule))
  }
  for (const aRule in rules) {
    engine.addRule(aRule)
  }
  return engine
}
