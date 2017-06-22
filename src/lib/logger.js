var log4js = require('log4js')

log4js.configure({
  appenders: [
    {
      type: 'console',
      level: 'INFO'
    }
  ]
})

/**
 * return a module logger
 *
 * @param {String} moduleName
 * @returns
 */
function moduleLogger (moduleName) {
  return log4js.getLogger(moduleName)
}

module.exports = moduleLogger
