/**
 * This service provides operations of Notams.
 */
const Joi = require("joi");
const geoJsonResponse = require("../../data/geoJsonResponse.json");
const {aixm, aidap} = require("../../data/xmlResponse");
const config = require("config");

const searchSchema = Joi.object({
  pageNum: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(50).default(config.PAGE_SIZE),
  notamNumber: Joi.string(),
  icaoLocation: Joi.string(),
  locationRadius: Joi.number().precision(2),
  locationLongitude: Joi.number().precision(2),
  locationLatitude: Joi.number().precision(2),
})
  .with("notamNumber", "icaoLocation")
  .with("icaoLocation", "notamNumber")
  .with("locationRadius", "locationLongitude")
  .with("locationLongitude", "locationRadius")
  .with("locationLatitude", "locationRadius")
  .with("locationRadius", "locationLatitude");

/**
 * Search geo json
 *
 * @param {Object} user the JwT user object
 * @param {Object} challenge the challenge object
 * @returns {undefined}
 */
async function searchGeoJson(criteria) {
  const {err} = await Joi.validate(criteria, searchSchema);
  return err || geoJsonResponse;
}

/**
 * Search Aixm
 *
 * @param {Object} user the JwT user object
 * @param {Object} challenge the challenge object
 * @returns {undefined}
 */
async function searchAixm(criteria) {
  const {err} = await Joi.validate(criteria, searchSchema);
  return err || aixm;
}

/**
 * Search Aixdap
 *
 * @param {Object} user the JwT user object
 * @param {Object} challenge the challenge object
 * @returns {undefined}
 */
async function searchAidap(criteria) {
  const {err} = await Joi.validate(criteria, searchSchema);
  return err || aidap;
}

module.exports = {
  searchGeoJson,
  searchAixm,
  searchAidap,
};
