var defaultConfig = require('./config.default')
var logger = require('../lib/logger')('config')
var config = {}

try {
  config = require('../../config')
} catch (error) {
  logger.warn('No user config.json find, use default config')
}

config = Object.assign(defaultConfig, config)

module.exports = config
