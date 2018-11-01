module.exports.loggedData = [
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
  }
]

module.exports.expectedDataAnalysis = {
  'graph_1': {
    xAxis: [
      '2018-11-01T02:30:29.307Z',
      '2017-11-01T02:30:29.307Z',
      '2018-11-01T12:30:30.307Z',
      '2017-11-01T15:30:29.307Z'
    ],
    yAxis: [3, 1, 2, 1],
    title: 'Number of articles published as a function of time',
    yAxis_title: 'number of articles'
  }
}
