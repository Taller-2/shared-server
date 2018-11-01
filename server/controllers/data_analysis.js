require('./utils')
/*
schema = {
  'name': str,
  'action': str,
  'description': str,
  'price': float,
  'user': str,
  'timestamp': str,
  'latitude': float,
  'longitude': float
}
*/
function numberOfArticlesPublishedAsAFunctionOfTime (data) {
  let postedArticles = data.filter(article => article['action'] === 'post')
  let postedArticlesGroupedByTimestamp = postedArticles.groupBy('timestamp')
  const timestamp = Object.keys(postedArticlesGroupedByTimestamp)
  let numberOfArticles = []
  for (let aTimestamp in postedArticlesGroupedByTimestamp) {
    numberOfArticles.push(postedArticlesGroupedByTimestamp[aTimestamp].length)
  }
  return {
    xAxis: timestamp,
    yAxis: numberOfArticles,
    title: 'Number of articles published as a function of time',
    yAxis_title: 'number of articles'
  }
}

module.exports.getAnalysis = function (data) {
  return {
    'graph_1': numberOfArticlesPublishedAsAFunctionOfTime(data)
  }
}
