const router = require('express').Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secret = require('../secrets')
const model = require('../models')
const bcrypt = require('bcrypt')

function createSession(user, req, res, next) {
	if (user && bcrypt.compareSync(req.body.pass, user.password)) {
		const token = jwt.sign(user, secret)
		res.status(200).json({ message: 'Authenticated', token: token })
	} else {
		const err = new Error('Usuario o password invalido')
		err.status = 401 // Unauthorized
		return next(err)
	}
}

function dbError(error, req, res) {
	res.status(401).json({ success: false, error: error })
}

// POST /login
router.post('/', bodyParser.json(), function (req, res, next) {

	model.User.findAll({
		where: {
			email: req.body.email
		}})
		.then(user => createSession(user, req, res, next))
		.catch(error => dbError(error, req, res, next))


})

router.delete('/', (_, response) => response.send({ message: 'Hello World!' }))

module.exports = router
