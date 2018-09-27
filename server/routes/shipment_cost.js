const router = require('express').Router()
const bodyParser = require('body-parser')
const engine = require('../rules/shipment_cost_rules')


router.post('/', bodyParser.json(), function (req, res) {
	const {
		user_characteristics, 
		User_score, 
		Payment_method, 
		shipping_characteristics,
		server_id,
		trip_date,
		trip_time
	} = req.body
	const { daytripps, monthtrips, Antiquity} = user_characteristics
	const { 
		duration, 
		distance, 
		geographical_position,
		date, 
		time
	} = shipping_characteristics
	//res.send({ message: req.body })
	let facts = { test_rule: true }
	engine.run(facts).then(triggered_events => {
		// engine returns a list of events with truthy conditions
		array = triggered_events.map(
			event => ({ message: event.params.data}))
			res.send(array)
	}).catch(() => res.send({ message: "test_rule failed"}))
})

module.exports = router