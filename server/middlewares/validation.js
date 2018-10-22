const { validationResult } = require('express-validator/check')
const httpStatus = require('http-status-codes')

module.exports.validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let obj = { success: false }
    errors.array().forEach(e => { obj[e.param] = e.msg })
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: obj })
  }
  next()
}
