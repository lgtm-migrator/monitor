var util = require('../lib/util')
var validator = require('validator')

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
      throw new Error('User uname should not be empty!')
    }
    if (!validator.isEmail(uname)) {
      throw new Error(`${uname} is not a valid email address!`)
    }
    this.uname = uname
    this.utoken = utoken
  }
}

module.exports = User
