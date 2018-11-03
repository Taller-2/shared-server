const router = require('express').Router()
const bodyParser = require('body-parser')
const sessionController = require('../controllers/session')

router.post('/', bodyParser.json(), sessionController.create)

router.get('/credit', (request, response, next) => {
    console.log('hola')
    response.json({ success: true })
})

module.exports = router
