const API_URL = 'https://taller2-app-server.herokuapp.com/'
const HttpService = require('./http_service')
const getAnalysis = require('./data_analysis').getAnalysis
const httpStatus = require('http-status-codes')

module.exports.makeAnalysis = function (req, res, next) {
  // const loggedData = require('../../test/data_analysis_definitions').mixedArtcilesLoggedData
  // const analysis = getAnalysis(loggedData)
  // res.status(httpStatus.OK).json({ success: true, analysis: analysis })
  HttpService.get(API_URL + '/article_stats')
    .then(response => {
      // {"ok": True, "data": data}
      if (response.body.ok) {
        res.status(httpStatus.OK).json({ success: true, analysis: getAnalysis(req.body) })
      } else {
        res.status(httpStatus.BAD_REQUEST).json({ success: true, error: 'response was not ok' })
      }
    })
    .catch(err => {
      res.status(httpStatus.BAD_GATEWAY).json({ success: true, error: err })
    })
}
