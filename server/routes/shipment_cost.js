const router = require('express').Router()
const bodyParser = require('body-parser')
const shipment_cost_rule = require("../rules")

router.post('/', bodyParser.json(), function (/*req, res, next*/) {
	/*
	const {
		user_characteristics, 
		User_score, 
		Payment_method, 
		shipping_characteristics,
		server_id,
		trip_date,
		trip_time
	} = request.body
	const { daytripps, monthtrips, Antiquity} = usercharacteristics
	const { 
		duration, 
		distance, 
		geographical_position, 
		date, 
		time
	} = shipping_characteristics
	*/
	let facts = { test_rule: true }
	shipment_cost_rule.engine.run(facts).then(triggeredEvents => {
		// engine returns a list of events with truthy conditions
		triggeredEvents.map(event => console.log(event.params.data.green))
	}).catch(console.log)
})

module.exports = router