var Message = require('./Message')

/**
 * Http Error
 *
 * @class HttpError
 * @extends {Message}
 */
class HttpError extends Message {
  /**
   * Creates an instance of HttpError.
   * @param {Error} err
   * @param {number} [status=500]
   *
   * @memberof HttpError
   */
  constructor (err, status = 500) {
    super(err.message, status)
  }
}

module.exports = HttpError
