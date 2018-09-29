const router = require('express').Router()
const bodyParser = require('body-parser')
const engine = require('../rules/shipment_cost_rules')


router.post('/', bodyParser.json(), function (req, res) {
	/*
	const {
		user_characteristics: { 
			daytrips, // (int)
			monthtrips, // (int)
			antiquity  // (int)
		}, 
		user_score,  // (float)
		payment_method, // (string)
		shipping_characteristics: { 
			duration,  // (float)
			distance,  // (float)
			geographical_position: {
				latitud,  // (float)
				longitud // (float)
			},
			date, // (string: YYYY/MM/DD)
			time // (string: HH:MM)
		},
		server_id, // (int)
		trip_date, // (string: YYYY/MM/DD)
		trip_time // (string: HH:MM)
	} = req.body
	*/
	let facts = { test_rule: true }
	let array
	engine.run(facts).then(triggered_events => {
		// engine returns a list of events with truthy conditions
		array = triggered_events.map(
			event => ({ message: event.params.data}))
		res.send(array)
	}).catch(() => res.send({ message: 'test_rule failed'}))
})

module.exports = router