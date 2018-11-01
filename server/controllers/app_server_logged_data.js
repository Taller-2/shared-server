const API_URL = process.env.APP_SERVER_ARTICLE_STATS || 'https://taller2-app-server.herokuapp.com/'
const HttpService = require('./http_service')
const getAnalysis = require('./data_analysis').getAnalysis
const httpStatus = require('http-status-codes')

module.exports.makeAnalysis = function (req, res) {
  HttpService.get(API_URL + '/article_stats')
    .then(response => {
      // {"ok": True, "data": data}
      if (response.body.ok) {
        res.status(httpStatus.OK)
        res.send({ success: true, analysis: getAnalysis(req.body) })
      } else {
        res.status(httpStatus.BAD_REQUEST)
        res.send({ success: false, error: 'response was not ok' })
      }
    })
    .catch(err => console.log('EEROR WHEN GETTING DATA FROM APP SERVER: ', err))
}
