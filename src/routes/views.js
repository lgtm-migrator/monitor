var r = require('express').Router()
var config = require('../config')

const pagePathes = {
  Home: '/',
  Monitor: '/monitor',
  Login: '/login',
  SignUp: '/signup',
  Logout: '/logout'
}

function renderWithConfig (templateName, c = {}, redirectWhenLogin = true) {
  return (req, res) => {
    if (req.session.user && redirectWhenLogin) {
      res.redirect(pagePathes.Monitor)
    } else {
      res.render(
        templateName,
        Object.assign(config, c, {
          activeHome: req.path === pagePathes.Home,
          activeMonitor: req.path === pagePathes.Monitor,
          isLogin: req.session.user !== undefined
        })
      )
    }
  }
}

// make session easily access from template engine
r.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

r.get(pagePathes.Home, renderWithConfig('index', {}, false))

r.get(pagePathes.Login, renderWithConfig('login'))

r.get(pagePathes.SignUp, renderWithConfig('signup'))

r.get(pagePathes.Monitor, renderWithConfig('monitor', {}, false))

module.exports = r
