/**
 * The application entry point
 */

const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { errorHandler } = require('./src/common/errorhandler')

// setup express app
const app = express()

app.use(cors({}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', config.PORT)

// Register routes
require('./app-routes')(app)

// The error handler
// eslint-disable-next-line no-unused-vars
app.use(errorHandler)

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})
