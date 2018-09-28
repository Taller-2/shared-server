const chai = require('chai')
const chai_http = require('chai-http')
var should = require('should')
var app = require('../server/index')
var server = app.listen()
chai.use(chai_http)

describe('Sample test shipment rule', function() {
	it('Trivial shipment rule test', function(done) { 
		chai.request(app.listen()) 
			.post('/shipment-cost')
			.send({}) 
			.end(function(err, res) { 
				should.equal(err, null)
				res.should.have.status(200) 
				res.should.be.json
				//res.body.should.be.a('array')
				res.body.should.have.length(1) 
				res.body[0].should.be.a('object') 
				res.body[0].should.have.property('message')
				res.body[0].message.should.be.a('string')
				res.body[0].message.should.equal('0')
				setImmediate(done)
			})
	})
	after(function (done) {
		server.close()
		done()
	})
})
