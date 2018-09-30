const model = require('../models')
const jwt = require('jsonwebtoken')
const secret = require('../secrets')
const bcrypt = require('bcrypt')

function createSession (user, req, res) {
  if (user && bcrypt.compareSync(req.body.pass, user.password)) {
    const token = jwt.sign(user, secret)
    res.status(200).json({ message: 'Authenticated', token: token })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

function dbError (error, req, res) {
  res.status(401).json({ success: false, error: error })
}

module.exports.create = function (req, res, next) {
  model.User.findOne({
    where: {
      email: req.body.email
    },
    raw: true
  })
    .then(user => createSession(user, req, res))
    .catch(error => dbError(error, req, res, next))
}
