let spawn = require('child-process-promise').spawn

module.exports = async function drop () {
  let status
  console.log('Drop running')
  await spawn('sequelize', ['db:drop']).then(() => {
    console.log('*************************')
    console.log('Database ', process.env.NODE_ENV, ' dropped')
    status = 0
  }).catch((err) => {
    console.error('*************************')
    console.error('ERROR: database ', process.env.NODE_ENV, ' does not exist.', err.message)
    status = 1
  })
  return status
}
