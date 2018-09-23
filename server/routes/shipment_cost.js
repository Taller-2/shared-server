const router = require('express').Router()
const rule = require('../rules')

router.post('/shipment-cost', bodyParser.json(), function (req, res, next) {
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
    rule.engine.addRule(rule)
    let facts = { test_rule: true }
    engine
        .run(facts)
        .then(triggeredEvents => {
            // engine returns a list of events with truthy conditions
            triggeredEvents.map(event => console.log(event.params.data.green))
        })
    .catch(console.log)
    response.status(201).json({ success: true, user: "user" })
})