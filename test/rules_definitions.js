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

module.exports.multipleConditionsRule = {
  'conditions': {
    'all': [
      {
        'fact': 'daytrips',
        'operator': 'equal',
        'value': 10
      },
      {
        'fact': 'daytrips',
        'operator': 'equal',
        'value': 10
      },
      {
        'fact': 'daytrips',
        'operator': 'equal',
        'value': 10
      },
      {
        'fact': 'daytrips',
        'operator': 'equal',
        'value': 10
      },
      {
        'fact': 'daytrips',
        'operator': 'equal',
        'value': 10
      }
    ]
  },
  'event': {
    'type': 'percentage',
    'params': {
      'data': 10
    }
  }
}

module.exports.InvalidTripTimeRule = {
  'conditions': {
    'all': [{
      'fact': 'tripTime',
      'operator': 'equal',
      'value': '24:34'
    }]
  },
  'event': {
    'type': 'test',
    'params': {
      'data': 0
    }
  }
}

module.exports.InvalidTripDateRule = {
  'conditions': {
    'all': [{
      'fact': 'tripDate',
      'operator': 'equal',
      'value': '02/12/2017'
    }]
  },
  'event': {
    'type': 'test',
    'params': {
      'data': 0
    }
  }
}
