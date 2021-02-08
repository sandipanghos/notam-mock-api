/**
 * The configuration file.
 */

module.exports = {
  PORT: process.env.PORT || 8080,
  // used to properly set the header response to api calls for services behind a load balancer
  API_BASE_URL: process.env.API_BASE_URL || `http://localhost:3000`,
  API_VERSION: process.env.API_VERSION || "v1",
  API_KEY: process.env.API_KEY || "dffsdfgdsfdsgds",
  PAGE_SIZE: process.env.PAGE_SIZE || 20,
};
