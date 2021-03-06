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
function numberOfArticlesAsAFunctionOfTime (data, action, title, yAxisTitle) {
  let postedArticles = data.filter(article => article['action'] === action)
  if (JSON.stringify(postedArticles) === JSON.stringify([])) {
    return false
  }
  postedArticles = postedArticles.map(event => {
    event.timestamp = event.timestamp.split(' ')[0]
    return event
  })
  let postedArticlesGroupedByTimestamp = postedArticles.groupBy('timestamp')
  const timestamp = Object.keys(postedArticlesGroupedByTimestamp)
  let numberOfArticles = []
  for (let aTimestamp in postedArticlesGroupedByTimestamp) {
    numberOfArticles.push(postedArticlesGroupedByTimestamp[aTimestamp].length)
  }
  return {
    xAxis: timestamp,
    yAxis: numberOfArticles,
    title: title,
    yAxisTitle: yAxisTitle
  }
}

function numberOfArticlesPublishedAsAFunctionOfTime (data) {
  const title = 'Number of articles published as a function of time'
  const yAxisTitle = 'number of articles'
  return numberOfArticlesAsAFunctionOfTime(data, 'post', title, yAxisTitle)
}

function numberOfArticlesDeletedAsAFunctionOfTime (data) {
  const title = 'Number of articles deleted as a function of time'
  const yAxisTitle = 'number of articles'
  return numberOfArticlesAsAFunctionOfTime(data, 'delete', title, yAxisTitle)
}

function numberOfArticlesUpdatedAsAFunctionOfTime (data) {
  const title = 'Number of articles updated as a function of time'
  const yAxisTitle = 'number of articles'
  return numberOfArticlesAsAFunctionOfTime(data, 'update', title, yAxisTitle)
}

function numberOfArticlesConsultedAsAFunctionOfTime (data) {
  const title = 'Number of articles consulted as a function of time'
  const yAxisTitle = 'number of articles'
  return numberOfArticlesAsAFunctionOfTime(data, 'get', title, yAxisTitle)
}

function buildAnalysisResponse (analyisis) {
  let builder = {}
  let idx = 0
  analyisis.forEach((anAnalysis, i) => {
    if (anAnalysis !== false) {
      idx += 1
      builder['graph_' + idx.toString()] = anAnalysis
    }
  })
  return builder
}

module.exports.getAnalysis = function (data) {
  const graph1 = numberOfArticlesPublishedAsAFunctionOfTime(data)
  const graph2 = numberOfArticlesConsultedAsAFunctionOfTime(data)
  const graph3 = numberOfArticlesDeletedAsAFunctionOfTime(data)
  const graph4 = numberOfArticlesUpdatedAsAFunctionOfTime(data)
  return buildAnalysisResponse([graph1, graph2, graph3, graph4])
}
