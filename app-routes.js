/**
 * Configure all routes for express app
 */

const _ = require('lodash')
const config = require('config')
const helper = require('./src/common/helper')
const { auth } = require('./src/common/authentication')
const routes = require('./src/routes')
const { NotFoundError } = require('./src/common/errors')

/**
 * Configure all routes for express app
 * @param app the express app
 */
module.exports = (app) => {
  // Load all routes
  _.each(routes, (verbs, path) => {
    _.each(verbs, (def, verb) => {
      const controllerPath = `./src/controllers/${def.controller}`
      const method = require(controllerPath)[def.method]; // eslint-disable-line
      if (!method) {
        console.log(`${def.method} is undefined`)
      }

      const actions = []
      actions.push((req, res, next) => {
        req.signature = `${def.controller}#${def.method}`
        next()
      })

      if (def.auth) {
        actions.push((req, res, next) => {
          auth(req, res, next)
        })
      }

      actions.push(method)
      app[verb](
        `/${config.API_VERSION}${path}`,
        helper.autoWrapExpress(actions)
      )
    })
  })

  // Check if the route is not found or HTTP method is not supported
  app.use('*', (req, res) => {
    if (!routes[req.baseUrl]) {
      throw new NotFoundError('The requested resource cannot be found.')
    }
  })
}
