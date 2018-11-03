const router = require('express').Router()
const bodyParser = require('body-parser')
const sessionController = require('../controllers/session')

router.post('/', bodyParser.json(), sessionController.create)

module.exports = router
