const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt')
const secret = require('../secrets')
const httpStatus = require('http-status-codes')
const model = require('../models')

const errorObj = { name: 'UnauthorizedError', message: 'Invalid authorization token' }

function errorHandler (error, req, res, next) {
  if (error.name === errorObj.name) {
    res.status(httpStatus.UNAUTHORIZED).json(errorObj)
  } else {
    next(error)
  }
}

function auth (req, res, next) {
  if (isTestEnv()) {
    next()
  } else {
    let appServerToken = req.get('X-Auth-App')
    if (appServerToken) {
      let decoded = jsonwebtoken.decode(appServerToken)
      let scope = {}
      decoded.name ? scope['name'] = decoded.name : next(errorObj)
      model.AppServer.findOne(scope)
        .then(appServer => {
          try {
            jsonwebtoken.verify(appServerToken, appServer.secret)
            next()
          } catch (err) {
            next(errorObj)
          }
        }).catch(e => res.status(500).send({ success: false }))
    } else {
      jwt({ secret: secret })(req, res, next)
    }
  }
}

function isTestEnv () {
  return process.env.LOADED_MOCHA_OPTS
}

// Skip authorization middleware if the app is being used for running tests
// (This is in order to have tests pass without having to mock this functionality)
exports.requireAuth = auth

exports.unauthorizedErrorHandler = errorHandler
