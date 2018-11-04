module.exports.startConection = function () {
  const app = require('../server/index')
  const port = process.env.PORT || 5000
  let server = app.listen(port, 'localhost', () => {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++')
    console.log("Calling app.listen's callback function.")
    let host = server.address().address
    let port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
    console.log('enviroment: ', app.settings.env)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++')
  })
  return server
}
