require('./models/index')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const app = express()
const port = process.env.PORT || 5000

// Request body-parsing middleware
app.use(bodyParser.json())
app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/user', require('./routes/user'))
app.use('/app-server', require('./routes/app_server'))
app.use('/session', require('./routes/session'))
app.use('/shipment-cost', require('./routes/shipment_cost'))

// Error handler - TODO setear status code apropiadamente
app.use(function (error, req, res, next) {
  res.status(400).json(JSON.parse(error.message))
})

// Production-specific setup
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

if (!module.parent) {
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app
