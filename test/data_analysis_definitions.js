// ----------------------------------------------------------------
// POSTED
// ----------------------------------------------------------------
module.exports.postedArtcilesLoggedData = [
  {
    'name': 'IPhone1',
    'action': 'post',
    'description': 'A great cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'IPhone2',
    'action': 'post',
    'description': 'A not so great cell phone',
    'price': 300,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Sony ericsson',
    'action': 'post',
    'description': 'A very old cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'nokia 5200',
    'action': 'post',
    'description': 'An old cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'stratocaster Fender',
    'action': 'post',
    'description': 'A great guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T12:30:30.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'gibson E335',
    'action': 'post',
    'description': 'A very good guitar with incredible sound',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T12:30:30.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'post',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  }
]

module.exports.postedDataAnalysis = {
  'graph_1': {
    xAxis: [
      '2018-11-01T02:30:29.307Z',
      '2017-11-01T02:30:29.307Z',
      '2018-11-01T12:30:30.307Z',
      '2017-11-01T15:30:29.307Z'
    ],
    yAxis: [3, 1, 2, 1],
    title: 'Number of articles published as a function of time',
    yAxisTitle: 'number of articles'
  }
}

// ----------------------------------------------------------------
// CONSULTED
// ----------------------------------------------------------------
module.exports.consultedArtcilesLoggedData = [
  {
    'name': 'IPhone1',
    'action': 'get',
    'description': 'A great cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'IPhone2',
    'action': 'get',
    'description': 'A not so great cell phone',
    'price': 300,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'get',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  }
]

module.exports.consultedDataAnalysis = {
  'graph_1': {
    xAxis: [
      '2018-11-01T02:30:29.307Z',
      '2017-11-01T15:30:29.307Z'
    ],
    yAxis: [2, 1],
    title: 'Number of articles consulted as a function of time',
    yAxisTitle: 'number of articles'
  }
}

// ----------------------------------------------------------------
// DELETED
// ----------------------------------------------------------------
module.exports.deletedArtcilesLoggedData = [
  {
    'name': 'IPhone1',
    'action': 'delete',
    'description': 'A great cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'IPhone2',
    'action': 'delete',
    'description': 'A not so great cell phone',
    'price': 300,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Sony ericsson',
    'action': 'delete',
    'description': 'A very old cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  }
]

module.exports.deletedDataAnalysis = {
  'graph_1': {
    xAxis: [
      '2018-11-01T02:30:29.307Z',
      '2017-11-01T15:30:29.307Z'
    ],
    yAxis: [3, 3],
    title: 'Number of articles deleted as a function of time',
    yAxisTitle: 'number of articles'
  }
}

// ----------------------------------------------------------------
// UPDATED
// ----------------------------------------------------------------
module.exports.updatedArtcilesLoggedData = [
  {
    'name': 'IPhone1',
    'action': 'update',
    'description': 'A great cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'IPhone2',
    'action': 'update',
    'description': 'A not so great cell phone',
    'price': 300,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'nokia 5200',
    'action': 'update',
    'description': 'An old cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'stratocaster Fender',
    'action': 'update',
    'description': 'A great guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T12:30:30.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'gibson E335',
    'action': 'update',
    'description': 'A very good guitar with incredible sound',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T12:30:30.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  }
]

module.exports.updatedDataAnalysis = {
  'graph_1': {
    xAxis: [
      '2018-11-01T02:30:29.307Z',
      '2017-11-01T02:30:29.307Z',
      '2018-11-01T12:30:30.307Z'
    ],
    yAxis: [2, 1, 2],
    title: 'Number of articles updated as a function of time',
    yAxisTitle: 'number of articles'
  }
}

// ----------------------------------------------------------------
// MIXED
// ----------------------------------------------------------------
module.exports.mixedArtcilesLoggedData = [
  {
    'name': 'IPhone1',
    'action': 'post',
    'description': 'A great cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'IPhone2',
    'action': 'post',
    'description': 'A not so great cell phone',
    'price': 300,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Sony ericsson',
    'action': 'post',
    'description': 'A very old cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'nokia 5200',
    'action': 'post',
    'description': 'An old cell phone',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T02:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'stratocaster Fender',
    'action': 'post',
    'description': 'A great guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T12:30:30.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'gibson E335',
    'action': 'post',
    'description': 'A very good guitar with incredible sound',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T12:30:30.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'post',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'get',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'get',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'get',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'get',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'update',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'update',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2018-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'update',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'update',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T15:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T16:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  },
  {
    'name': 'Telecaster Fender',
    'action': 'delete',
    'description': 'A very good guitar',
    'price': 3000,
    'user': '1',
    'timestamp': '2017-11-01T17:30:29.307Z',
    'latitude': 37.658974,
    'longitude': -5.526148
  }
]

module.exports.mixedDataAnalysis = {
  'graph_1': {
    xAxis: [
      '2018-11-01T02:30:29.307Z',
      '2017-11-01T02:30:29.307Z',
      '2018-11-01T12:30:30.307Z',
      '2017-11-01T15:30:29.307Z'
    ],
    yAxis: [3, 1, 2, 1],
    title: 'Number of articles published as a function of time',
    yAxisTitle: 'number of articles'
  },
  'graph_2': {
    xAxis: [
      '2017-11-01T15:30:29.307Z',
      '2018-11-01T15:30:29.307Z'
    ],
    yAxis: [3, 1],
    title: 'Number of articles consulted as a function of time',
    yAxisTitle: 'number of articles'
  },
  'graph_3': {
    xAxis: [
      '2017-11-01T15:30:29.307Z',
      '2017-11-01T16:30:29.307Z',
      '2017-11-01T17:30:29.307Z'
    ],
    yAxis: [3, 1, 1],
    title: 'Number of articles deleted as a function of time',
    yAxisTitle: 'number of articles'
  },
  'graph_4': {
    xAxis: [
      '2018-11-01T15:30:29.307Z',
      '2017-11-01T15:30:29.307Z'
    ],
    yAxis: [2, 2],
    title: 'Number of articles updated as a function of time',
    yAxisTitle: 'number of articles'
  }
}
