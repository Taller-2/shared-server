const router = require('express').Router()
const bodyParser = require('body-parser')
const rulesController = require('../controllers/rules')

router.get('/:id?', rulesController.findById)

router.post('/', bodyParser.json(), rulesController.create)

router.put('/:id', rulesController.update)

router.delete('/:id', rulesController.delete)

module.exports = router
