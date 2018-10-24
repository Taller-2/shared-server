const { validationResult } = require('express-validator/check')
const httpStatus = require('http-status-codes')

module.exports.validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorMsgs = { }
    errors.array().forEach(e => { errorMsgs[e.param] = e.msg })
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: errorMsgs, success: false })
  }
  next()
}
