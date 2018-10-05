const router = require('express').Router()
const bodyParser = require('body-parser')
const rulesController = require('../controllers/rules')

router.get('/:id?', rulesController.findById)

router.get('/', rulesController.findAll)

router.post('/', bodyParser.json(), rulesController.create)

router.put('/:id', rulesController.update)

router.delete('/:id', rulesController.delete)

router.delete('/', rulesController.deleteAll)

module.exports = router
