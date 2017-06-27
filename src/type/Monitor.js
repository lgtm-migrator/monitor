var ValidateError = require('./ValidateError')

class Monitor {
  constructor (uid, type, target) {
    if (!uid) {
      throw new ValidateError('Monitor uid should not be empty !')
    }
    if (!type) {
      throw new ValidateError('Monitor type should not be empty !')
    }
    if (!target) {
      throw new ValidateError('Monitor target should not be empty !')
    }
    this.uid = uid
    this.type = type
    this.target = target
  }
}

module.exports = Monitor
