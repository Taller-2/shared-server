var exec = require('child-process-promise').exec

module.exports = async function migrate () {
  var status
  await exec('sequelize db:migrate').then(() => {
    console.log('*************************')
    console.log('Migration successful')
    status = 0
  }).catch((err) => {
    console.log('*************************')
    console.log('No migrations were executed, database schema was already up to date.')
    status = 1
  })
  return status
}
