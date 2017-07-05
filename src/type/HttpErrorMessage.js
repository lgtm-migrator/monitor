var Message = require('./Message')

/**
 * Http Error
 *
 * @class HttpError
 * @extends {Message}
 */
class HttpErrorMessage extends Message {
  /**
   * Creates an instance of HttpError.
   * @param {Error} err
   * @param {number} [status=500]
   *
   * @memberof HttpError
   */
  constructor (err, status = 500) {
    super(err.message, status)
    this.errType = err.constructor.name
  }
}

module.exports = HttpErrorMessage
