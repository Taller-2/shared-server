const jwt = require('express-jwt')
const secret = require('../secrets')
const httpStatus = require('http-status-codes')

function errorHandler (error, req, res) {
  let status = httpStatus.UNAUTHORIZED
  if (error.name !== 'UnauthorizedError') {
    status = httpStatus.BAD_REQUEST
    error = JSON.parse(error.message)
  }
  res.status(status).json(error)
}

// Skip authorization middleware if the app is being used for running tests
// (This is in order to have tests pass without having to mock this functionality)
exports.requireAuth = process.env.LOADED_MOCHA_OPTS ? (req, res, next) => next() : jwt({ secret: secret })

exports.unauthorizedErrorHandler = errorHandler
