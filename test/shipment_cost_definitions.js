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
      'fact': ['distance']
    }
  }
}

module.exports.percentageRule = {
  'conditions': {
    'all': [{
      'fact': 'userScore',
      'operator': 'equal',
      'value': 50
    }]
  },
  'event': {
    'type': 'percentage',
    'params': {
      'data': 10
    }
  }
}

module.exports.discountRule = {
  'conditions': {
    'all': [{
      'fact': 'userScore',
      'operator': 'equal',
      'value': 50
    }]
  },
  'event': {
    'type': 'discount',
    'params': {
      'data': 10
    }
  }
}

module.exports.surchargeRule = {
  'conditions': {
    'all': [{
      'fact': 'distance',
      'operator': 'equal',
      'value': 50
    }]
  },
  'event': {
    'type': 'surcharge',
    'params': {
      'data': 10
    }
  }
}

module.exports.sumRule = {
  'conditions': {
    'all': [{
      'fact': 'userScore',
      'operator': 'lessThan',
      'value': 15
    }]
  },
  'event': {
    'type': 'sum',
    'params': {
      'data': 20
    }
  }
}
