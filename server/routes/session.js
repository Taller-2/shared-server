const router = require('express').Router()
const bodyParser = require('body-parser')
const model = require('../models')

// POST /login
router.post('/', bodyParser.json(), function (req, res, next) {
	console.log(req.body)
	console.log(model.User.findAll({
	  where: {
	    email: req.body.email
	  }
	}))
	res.send({ message: 'Hello World!' })
})

router.delete('/', (_, response) => response.send({ message: 'Hello World!' }))

module.exports = router
