module.exports.freeRule = {
  'conditions': {
    'all': [{
      'fact': 'email',
      'operator': 'domainEqual',
      'value': '@comprame.com'
    }]
  },
  'event': {
    'type': 'free',
    'params': {
      'data': 0
    }
  }
}

module.exports.disabledRule = {
  'conditions': {
    'all': [{
      'fact': 'userScore',
      'operator': 'lessThan',
      'value': 0
    }]
  },
  'event': {
    'type': 'disabled',
    'params': {
      'data': null
    }
  }
}

module.exports.factorRule = {
  'conditions': {
    'all': [{
      'fact': 'distance',
      'operator': 'greaterThan',
      'value': 30
    }]
  },
  'event': {
    'type': 'factor',
    'params': {
      'data': 15,
      'fact': 'distance'
    }
  }
}

module.exports.minPriceRule = {
  'conditions': {
    'all': [{
      'fact': 'price',
      'operator': 'lessThan',
      'value': 50
    }]
  },
  'event': {
    'type': 'disabled',
    'params': {
      'data': null
    }
  }
}
