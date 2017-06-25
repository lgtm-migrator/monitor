var r = require('express').Router()
var Message = require('../type/Message')
var db_user = require('../lib/db.user')
var User = require('../type/User')
var mailer = require('../lib/mailer')

/**
 *
 * @api {POST} /apis/v1/user create a user
 * @apiName create user
 * @apiGroup user
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} uname username but a email
 *
 */

r.post('/', async (req, res, next) => {
  try {
    var user = new User(req.body.uname)
    await db_user.addUser(user)
    await mailer.send_new_token(user.uname, user.utoken)
    res.json(new Message('User created, and the token will be sent to your mailbox as soon'))
  } catch (error) {
    next(error)
  }
})

// ^ public apis ^

r.put('/', async (req, res, next) => {
  try {
    var user = new User(req.session.user.uname)
    await db_user.updateUser(user)
    await mailer.send_new_token(user.uname, user.utoken)
    res.json(new Message('User updated, and new token will be sent to your mailbox as soon'))
  } catch (error) {
    next(error)
  }
})

module.exports = r
