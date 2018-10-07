var jwt = require('express-jwt')
const secret = require('../secrets')

function errorHandler (error, req, res, next) {
  if (error.name === 'UnauthorizedError') {
    res.status(401).json(error)
  } else {
    res.status(400).json(JSON.parse(error.message))
  }
}

// Skip authorization middleware if the app is being used for running tests
// (This is in order to have tests pass without having to mock this functionality)
exports.requireAuth = process.env.LOADED_MOCHA_OPTS ? (req, res, next) => next() : jwt({ secret: secret })

exports.unauthorizedErrorHandler = errorHandler
