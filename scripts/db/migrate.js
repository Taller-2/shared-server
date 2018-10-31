let exec = require('child-process-promise').exec

module.exports = async function migrate () {
  let status
  await exec('sequelize db:migrate').then(() => {
    console.log('*************************')
    console.log('Migration successful')
    status = 0
  }).catch((err) => {
    console.log('*************************')
    console.log(err.message)
    status = 1
  })
  return status
}
