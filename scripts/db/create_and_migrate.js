const create = require('./create')
const migrate = require('./migrate')

async function run () {
  await create()
  await migrate()
}

run()
