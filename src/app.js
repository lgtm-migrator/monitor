var express = require('express')
var session = require('express-session')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var HttpError = require('./type/Error')
var log4js = require('log4js')
var logger = require('./lib/logger')('app')

var app = express()

app.use(session({ secret: 'a secret for monitor' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(require('./routes/views'))

app.use(
  log4js.connectLogger(
    require('./lib/logger')('access'),
    {
      format: ':response-timems\t:status :method :url'
    }
  )
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: res => res.setHeader('cache-control', 'max-age=691200')
}))

app.use('/apis/v1', require('./apis/apis.v1.index'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  if (req.app.get('env') === 'development' && err.status !== 404) {
    logger.error(err.stack)
  }
  res.status(err.status || 500).json(new HttpError(err, err.status))
})

module.exports = app
