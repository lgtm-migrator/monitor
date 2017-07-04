var mysql = require('mysql')
var config = require('../config')
var P = require('bluebird')
var pool = mysql.createPool(config.DB_URI)
var poolAsync = P.promisifyAll(pool)

module.exports = {poolAsync, pool}
