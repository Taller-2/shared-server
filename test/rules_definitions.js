module.exports.normalRule = {
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

module.exports.emptyConditionRule = {
  'conditions': {
    'all': []
  },
  'event': {
    'type': 'test',
    'params': {
      'data': 0
    }
  }
}

module.exports.missingConditionRule = {
  'conditions': {
    'all': [{
      'fact': null,
      'operator': null,
      'value': null
    }]
  },
  'event': {
    'type': 'test',
    'params': {
      'data': 0
    }
  }
}
