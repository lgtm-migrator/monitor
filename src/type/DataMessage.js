var Message = require('./Message')

/**
 * Data Message
 *
 * @class DataMessage
 * @extends {Message}
 */
class DataMessage extends Message {
  /**
   * Creates an instance of DataMessage.
   * @param {Object} data
   * @param {number} [status=200]
   *
   * @memberof DataMessage
   */
  constructor (data, status = 200) {
    super(data, status)
    if (typeof data === 'object') {
      this.dataType = data.constructor.name
    }
  }
}

module.exports = DataMessage
