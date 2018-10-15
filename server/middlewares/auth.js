const jwt = require('express-jwt')
const secret = require('../secrets')
const httpStatus = require('http-status-codes')

function errorHandler (error, req, res) {
  if (error.name === 'UnauthorizedError') {
    res.status(httpStatus.UNAUTHORIZED).json(error)
  } else {
    res.status(httpStatus.BAD_REQUEST).json(JSON.parse(error.message))
  }
}

// Skip authorization middleware if the app is being used for running tests
// (This is in order to have tests pass without having to mock this functionality)
exports.requireAuth = process.env.LOADED_MOCHA_OPTS ? (req, res, next) => next() : jwt({ secret: secret })

exports.unauthorizedErrorHandler = errorHandler
