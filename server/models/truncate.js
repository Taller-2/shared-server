const models = require('./')

const truncateTable = (modelName) =>
  delete models[modelName]

module.exports = async function truncate (model) {
  if (model) {
    return truncateTable(model)
  }

  return Promise.all(
    Object.keys(models).map((key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null
      return truncateTable(key)
    })
  )
}
