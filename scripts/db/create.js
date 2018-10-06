var spawn = require('child-process-promise').spawn

module.exports = async function create () {
  var status
  console.log('Create running')
  await spawn('sequelize', ['db:create']).then(() => {
    console.log('*************************')
    console.log('Database ', process.env.NODE_ENV,' created.')
    status = 0
  }).catch((err) => {
    console.log('*************************')
    console.log('ERROR: database ', process.env.NODE_ENV,' already exists')
    status = 1
  })
  return status
}
