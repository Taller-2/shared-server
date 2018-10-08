
module.exports.validationHandler = next => result => {
  if (result.isEmpty()) return
  if (!next) {
    throw new Error(JSON.stringify(result.array()))
  } else {
    return next(new Error(JSON.stringify(result.array())))
  }
}
