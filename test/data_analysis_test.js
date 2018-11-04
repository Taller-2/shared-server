const chai = require('chai')
chai.use(require('chai-http'))
const should = require('should')
const getAnalysis = require('../server/controllers/data_analysis').getAnalysis
const {
  postedArtcilesLoggedData,
  postedDataAnalysis,
  consultedArtcilesLoggedData,
  consultedDataAnalysis,
  updatedArtcilesLoggedData,
  updatedDataAnalysis,
  deletedArtcilesLoggedData,
  deletedDataAnalysis,
  mixedArtcilesLoggedData,
  mixedDataAnalysis
} = require('./data_analysis_definitions')

describe('Data analysis test', function () {
  it('should recieve published data analysis', function (done) {
    const analysis = getAnalysis(postedArtcilesLoggedData)
    should.equal(JSON.stringify(analysis), JSON.stringify(postedDataAnalysis))
    done()
  })
  it('should recieve consulted data analysis', function (done) {
    const analysis = getAnalysis(consultedArtcilesLoggedData)
    should.equal(JSON.stringify(analysis), JSON.stringify(consultedDataAnalysis))
    done()
  })
  it('should recieve updated data analysis', function (done) {
    const analysis = getAnalysis(updatedArtcilesLoggedData)
    should.equal(JSON.stringify(analysis), JSON.stringify(updatedDataAnalysis))
    done()
  })
  it('should recieve deleted data analysis', function (done) {
    const analysis = getAnalysis(deletedArtcilesLoggedData)
    should.equal(JSON.stringify(analysis), JSON.stringify(deletedDataAnalysis))
    done()
  })
  it('should recieve mixed data analysis', function (done) {
    const analysis = getAnalysis(mixedArtcilesLoggedData)
    should.equal(JSON.stringify(analysis), JSON.stringify(mixedDataAnalysis))
    done()
  })
  it('should recieve empty analysis', function (done) {
    const analysis = getAnalysis([])
    should.equal(JSON.stringify(analysis), JSON.stringify({}))
    done()
  })
})
