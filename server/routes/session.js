const router = require('express').Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secret = require('../secrets')

// POST /login
router.post('/', bodyParser.json(), function (req, res, next) {
	// console.log(req.body)
	// console.log(model.User.findAll({
	//  where: {
	//    email: req.body.email
	//  }
	// }))
	// res.send({ message: 'Hello World!' })
	let user = {
		id: 1,
		name: 'Jhon Doe',
		enabled: true,
		email: 'emailvalido@email.com'
	}

	if (req.body.email === 'emailvalido@email.com') {
		const token = jwt.sign(
			user, //payload
			secret  // sign the token with my server-stored secret
		)
		res.status(200).json({ message: 'Authenticated', token: token })
	} else {
		const err = new Error('Usuario o password invalido')
		err.status = 401 // Unauthorized
		return next(err)
	}
})

router.delete('/', (_, response) => response.send({ message: 'Hello World!' }))

module.exports = router
