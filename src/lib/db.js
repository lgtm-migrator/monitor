var mysql = require('mysql')
var config = require('../config')
var P = require('bluebird')
var pool = mysql.createPool(config.DB_URI)
var poolAsync = P.promisifyAll(pool)
var query = P.promisify(pool.query)

module.exports = { pool, poolAsync, query }
