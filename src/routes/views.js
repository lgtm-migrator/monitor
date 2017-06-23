var r = require('express').Router()
var config = require('../config')

r.get('/', (req, res) => {
  res.render('index', config)
})

module.exports = r
