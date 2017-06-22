var util = require('../lib/util')
var validator = require('validator')

class User {
  constructor (uname = '', utoken = util.newToken()) {
    if (!uname) {
      throw new Error('User uname should not be empty!')
    }
    if (validator.isEmail(uname)) {
      throw new Error('User uname shoule be a valid email address')
    }
    this.uname = uname
    this.utoken = utoken
  }
}

module.exports = User
