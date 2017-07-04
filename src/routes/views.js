var r = require('express').Router()
var config = require('../config')

function renderWithConfig (templateName, c = {}, redirectWhenLogin = true) {
  return (req, res) => {
    if (req.session.user && redirectWhenLogin) {
      res.redirect('/monitor')
    } else {
      res.render(templateName, Object.assign(config, c))
    }
  }
}

// make session easily access from template engine
r.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

r.get('/', renderWithConfig('index', {}, false))

r.get('/login', renderWithConfig('login'))

r.get('/signup', renderWithConfig('signup'))

module.exports = r
