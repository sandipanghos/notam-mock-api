/**
 * This file defines application authentication
 */
const _ = require('lodash')
const config = require('config')
const { UnauthorizedError } = require('./errors')

/**
 * Authenticate using API-KEY
 * @param req the req
 * @param res the req
 * @param next the req
 * @returns {res|next} the respoonse object
 */
const auth = (req, res, next) => {
  if (
    _.isEmpty(req.headers) ||
    _.isEmpty(req.headers['x-api-key']) ||
    (!_.isEmpty(req.headers['x-api-key']) &&
      req.headers['x-api-key'] !== config.API_KEY)
  ) {
    throw new UnauthorizedError('API Key is invalid or expired.')
  } else {
    return next()
  }
}

module.exports = {
  auth
}
