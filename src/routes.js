/**
 * Contains all routes
 */
module.exports = {
  '/notams/geoJson': {
    get: {
      controller: 'NotamController',
      method: 'searchGeoJson',
      auth: 'API_KEY'
    }
  },
  '/notams/aixm': {
    get: {
      controller: 'NotamController',
      method: 'searchAixm',
      auth: 'API_KEY'
    }
  },
  '/notams/aidap': {
    get: {
      controller: 'NotamController',
      method: 'searchAidap',
      auth: 'API_KEY'
    }
  }
}
