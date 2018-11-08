const API_URL = 'https://taller2-app-server.herokuapp.com'
const HttpService = require('./http_service')
const getAnalysis = require('./data_analysis').getAnalysis
const httpStatus = require('http-status-codes')

module.exports.makeAnalysis = function (req, res, next) {
  HttpService.get(API_URL + '/article_stats/')
    .then(response => {
      // {"ok": True, "data": data}
      if (response.ok) {
        res
          .status(httpStatus.OK)
          .json({ success: true, analysis: getAnalysis(response.data) })
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ success: false, error: 'response was not ok' })
      }
    })
    .catch(err => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: err })
    })
}
