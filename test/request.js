const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

module.exports.post = async function (callback, server, data, endpoint) {
  await chai.request(server)
    .post(endpoint)
    .send(data)
    .then(function (err, res) {
      if (callback) callback(err, res)
    })
    .catch((err) => (err))
}

module.exports.get = async function (callback, server, id, endpoint) {
  await chai.request(server)
    .get(endpoint + id)
    .then(function (err, res) {
      if (callback) callback(err, res)
    })
    .catch((err) => (err))
}
