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
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
  const graph1 = numberOfArticlesPublishedAsAFunctionOfTime(data)
  // console.log('numberOfArticlesPublishedAsAFunctionOfTime: ', graph1)
  const graph2 = numberOfArticlesConsultedAsAFunctionOfTime(data)
  // console.log('numberOfArticlesConsultedAsAFunctionOfTime: ', graph2)
  const graph3 = numberOfArticlesDeletedAsAFunctionOfTime(data)
  // console.log('numberOfArticlesDeletedAsAFunctionOfTime: ', graph3)
  const graph4 = numberOfArticlesUpdatedAsAFunctionOfTime(data)
  // console.log('numberOfArticlesUpdatedAsAFunctionOfTime: ', graph4)
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
  return buildAnalysisResponse([graph1, graph2, graph3, graph4])
}
