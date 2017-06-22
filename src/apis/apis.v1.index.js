var express = require('express')
var router = express.Router()
var Message = require('../type/Message')
var User = require('../type/User')
var dbUser = require('../lib/db.user')

router.get('/', function (req, res, next) {
  res.json(new Message('Monitor Service powered by Node JS'))
})

router.post('/auth', async function (req, res, next) {
  try {
    var user = new User(req.body.uname, req.body.utoken)
    dbUser.findUser(user)
    if (dbUser) {
      req.session.user = dbUser
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
