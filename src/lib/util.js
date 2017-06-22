var uuid = require('uuid')

function newToken () {
  return uuid.v4().replace(/-/g, '')
}

module.exports = { newToken }
