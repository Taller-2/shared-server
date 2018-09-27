//'use strict'

let Rule = require('json-rules-engine').Rule
let Engine = require('json-rules-engine').Engine

let engine = new Engine()

let rule = new Rule({
	conditions: {
		all: [{
			fact: 'test_rule',
			operator: 'equal',
			value: true
		}]
	},
	event: {
		type: 'test',
		params: {
			data: '0'
		}
	}
})

engine.addRule(rule)
module.exports = engine
