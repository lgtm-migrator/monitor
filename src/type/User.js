var util = require('../lib/util')
var validator = require('validator')
var ValidateError = require('./ValidateError')

/**
 * User
 *
 * @class User
 */
class User {
  /**
   * Creates an instance of User.
   * @param {string} [uname='']
   * @param {any} [utoken=util.newToken()]
   * @memberof User
   */
  constructor (uname = '', utoken = util.newToken()) {
    if (!uname) {
      throw new ValidateError('User uname should not be empty !')
    }
    if (!validator.isEmail(uname)) {
      throw new ValidateError(`${uname} is not a valid email address !`)
    }
    this.uname = uname
    this.utoken = utoken
  }
}

module.exports = User
