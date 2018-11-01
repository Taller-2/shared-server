const chai = require('chai')
chai.use(require('chai-http'))
const should = require('should')
const getAnalysis = require('../server/controllers/data_analysis').getAnalysis
const { loggedData, expectedDataAnalysis } = require('./data_analysis_definitions')

describe('Data analysis test', function () {
  it('should recieve analysis data from logged info', function (done) {
    const analysis = getAnalysis(loggedData)
    should.equal(JSON.stringify(analysis), JSON.stringify(expectedDataAnalysis))
    done()
  })
})
