const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

module.exports.post = function (callback, server, data) {
  chai.request(server)
    .post('/rules')
    .send(data)
    .end(function (err, res) {
      callback(err, res)
    })
}

module.exports.get = function (callback, server, id) {
  chai.request(server)
    .get('/rules/' + id)
    .end(function (err, res) {
      if (callback) callback(err, res)
    })
}
