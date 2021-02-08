/**
 * Controller for Notams endpoints
 */
const HttpStatus = require('http-status-codes')
const service = require('../services/NotamServices')

/**
 * Search geoJson .
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function searchGeoJson (req, res) {
  const result = await service.searchGeoJson(req.query)
  res.status(HttpStatus.OK).send(result)
}

/**
 * Search Aixm .
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function searchAixm (req, res) {
  const result = await service.searchAixm(req.query)
  res.status(HttpStatus.OK).send(result)
}

/**
 * Search Aidap .
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function searchAidap (req, res) {
  const result = await service.searchAidap(req.query)
  res.status(HttpStatus.OK).send(result)
}

module.exports = {
  searchGeoJson,
  searchAixm,
  searchAidap
}
