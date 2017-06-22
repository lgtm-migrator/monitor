var express = require('express')
var router = express.Router()
var Message = require('../../type/Message')

router.get('/', function (req, res, next) {
  res.json(new Message('Monitor Service powered by Node JS'))
})

module.exports = router
