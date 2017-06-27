var ValidateError = require('./ValidateError')

class MonitorLog {
  constructor (mid, success = false, duration = 0) {
    if (!mid) {
      throw new ValidateError('MonitorLog mid should not be empty !')
    }
    this.mid = mid
    this.success = success
    this.duration = duration
  }
}

module.exports = MonitorLog
