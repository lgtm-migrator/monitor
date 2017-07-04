/**
 * Message
 *
 * @class Message
 */
class Message {
  /**
   * Creates an instance of Message.
   * @param {any} message
   * @param {number} [status=200]
   *
   * @memberof Message
   */
  constructor (message, status = 200) {
    this.message = message
    this.status = status
    this.msgType = this.constructor.name
  }
}

module.exports = Message
