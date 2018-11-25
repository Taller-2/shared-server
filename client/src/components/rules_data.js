module.exports.factsDefaultValues = {
  'antiquity': 10,
  'email': 'test@gmail.com',
  'userScore': 15,
  'paymentMethod': 'cash',
  'distance': 35,
  'latitude': 37.658974,
  'longitude': -5.526148,
  'tripDate': '2017/03/28',
  'tripTime': '13:30'
}

module.exports.facts = [
  'antiquity',
  'email',
  'userScore',
  'paymentMethod',
  'distance',
  'latitude',
  'longitude',
  'tripDate',
  'tripTime'
]
module.exports.ops = [
  'equal',
  'greaterThanInclusive',
  'lessThanInclusive',
  'greaterThan',
  'domainEqual',
  'lessThan'
]
module.exports.type = [
  'percentage',
  'factor',
  'sum',
  'discount',
  'surcharge',
  'free',
  'disabled'
]
