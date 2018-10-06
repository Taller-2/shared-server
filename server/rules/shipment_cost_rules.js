// 'use strict'

let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine

module.exports = function addRules (rules) {
  let engine = new Engine()
  const length = rules.length
  for (var i = 0; i < length; i++) {
    engine.addRule(new Rule(rules[i].json))
  }
  return engine
}
