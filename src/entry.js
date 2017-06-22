#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app')
var http = require('http')
var logger = require('./lib/logger')('entry')
var config = require('./config')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Error process
 *
 * @param {Error} error
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use')
      process.exit(1)
    default:
      logger.error(error.message)
      break
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  logger.info('Listening on ' + bind)
}
