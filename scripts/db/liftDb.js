const drop = require('./drop')
const create = require('./create')
const migrate = require('./migrate')

async function run () {
  var status = await drop()
  if (status === 1) {
    status = await create()
    status = await migrate()
  }
}

run()
