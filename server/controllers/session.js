const model = require('../models')
const jwt = require('jsonwebtoken')
const secret = require('../secrets')
const bcrypt = require('bcrypt')
const httpStatus = require('http-status-codes')

function createSession (user, req, res) {
  if (user && bcrypt.compareSync(req.body.pass, user.password)) {
    const token = jwt.sign(user, secret)
    res
      .status(httpStatus.OK)
      .json({ message: 'Authenticated', token: token })
  } else {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Unauthorized' })
  }
}

function dbError (error, req, res) {
  res
    .status(httpStatus.UNAUTHORIZED)
    .json({ success: false, error: error })
}

module.exports.create = function (req, res, next) {
  model.User.findByEmail(req.body.email)
    .then(user => createSession(user, req, res))
    .catch(error => dbError(error, req, res, next))
}
