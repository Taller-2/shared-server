const models = require('../../server/models')

const truncateTable = (modelName) =>
  models[modelName].destroy({
    where: {},
    force: true
  })

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
