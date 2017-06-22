var uuid = require('uuid').v4

class User {
  constructor (uid = 0, uname = '', utoken = uuid()) {
    this.uid = uid
    this.uname = uname
    this.utoken = utoken
  }
}

module.exports = User
