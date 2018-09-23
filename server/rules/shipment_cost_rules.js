require('colors')
let Rule = require('../dist').Rule
let Engine = require('../dist').Engine

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