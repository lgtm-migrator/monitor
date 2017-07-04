var express = require('express')
var router = express.Router()
var Message = require('../type/Message')
var User = require('../type/User')
var dbUser = require('../lib/db.user')

router.get('/', function (req, res, next) {
  res.json(new Message('Monitor Service powered by Node JS'))
})

/**
 *
 * @api {POST} /api/v1/auth Authorize
 * @apiName Authorize
 * @apiGroup home
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} uname user email
 * @apiParam  {String} utoken user token
 *
 */

router.post('/auth', async function (req, res, next) {
  try {
    var user = new User(req.body.uname, req.body.utoken)
    var findedUser = await dbUser.findUser(user)
    if (findedUser) {
      req.session.user = findedUser
      res.json(new Message(`${user.uname} have been authorized !`))
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

/**
 *
 * @api {POST} /api/v1/logout Logout
 * @apiName Logout
 * @apiGroup home
 * @apiVersion  1.0.0
 *
 */

router.post('/logout', async function (req, res, next) {
  try {
    if (req.session.user) {
      res.json(new Message(`${req.session.user.uname} logged out !`))
      req.session.destroy()
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.use('/user', require('./apis.v1.user'))

router.use('/monitor', require('./apis.v1.monitor'))

module.exports = router
