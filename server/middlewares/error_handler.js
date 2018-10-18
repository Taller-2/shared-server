const httpStatus = require('http-status-codes')

function errorHandler (error, req, res, next) {
  let jsonError = JSON.parse(error.message)
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(jsonError)
}

exports.globalErrorHandler = errorHandler
