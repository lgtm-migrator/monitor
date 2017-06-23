var r = require('express').Router()
var config = require('../config')

r.get('/', (req, res) => {
  res.render('index', config)
})

r.get('/login', (req, res) => {
  res.render('login', config)
})

module.exports = r
