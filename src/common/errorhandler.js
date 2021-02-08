/**
 * This file defines application errors
 */

const _ = require('lodash')
const HttpStatus = require('http-status-codes')
const { formatString } = require('./helper')
const config = require('config')

const errorHandler = (err, req, res, next) => {
  const errorResponse = {}

  // Bad Request Error Handler
  const status = err.isJoi
    ? HttpStatus.BAD_REQUEST
    : err.httpStatus ||
      _.get(err, 'response.status') ||
      HttpStatus.INTERNAL_SERVER_ERROR

  if (_.isArray(err.details)) {
    if (err.isJoi) {
      _.map(err.details, (e) => {
        if (e.message) {
          if (_.isUndefined(errorResponse.message)) {
            errorResponse.message = formatString(e.message)
          } else {
            errorResponse.message += `, ${formatString(e.message)}`
          }
        }
      })
    }
  }

  // Other Error handler
  if (_.isUndefined(errorResponse.message)) {
    if (err.message && status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      errorResponse.message = formatString(err.message)
    } else {
      errorResponse.message = 'Internal server error'
    }
  }

  if (
    ['aixm', 'aidap'].includes(
      req.path.split(`/${config.API_VERSION}/notams/`)[1]
    )
  ) {
    res.status(status).send(`<?xml version="1.0" encoding="UTF-8"?>
    <ApiErrorModel>
      <message>${errorResponse.message}</message>
    </ApiErrorModel>`)
  } else {
    res.status(status).json(errorResponse)
  }
}

module.exports = {
  errorHandler
}
