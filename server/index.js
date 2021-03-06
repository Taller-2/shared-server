const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const authUtils = require('./middlewares/auth')
const errorHandler = require('./middlewares/error_handler')

const app = express()
const port = process.env.PORT || 5000

// Request body-parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
// Routes
app.use('/user', require('./routes/user'))
app.use('/session', require('./routes/session'))
app.use('/app-server', require('./routes/app_server'))
app.use('/shipment-cost', require('./routes/shipment_cost'))
app.use('/payments', require('./routes/payments'))
app.use('/shipments', require('./routes/shipments'))
app.use('/rules', require('./routes/rules'))
app.use('/app-server-logged-data', require('./routes/app_server_logged_data'))

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

app.use(authUtils.unauthorizedErrorHandler)
// Add any custom error handler here
app.use(errorHandler.globalErrorHandler)

module.exports = app
