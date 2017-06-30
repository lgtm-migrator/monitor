var r = require('express').Router()
var dbMonitor = require('../lib/db.monitor')
var DataMessage = require('../type/DataMessage')

// ^ public ^

r.get('/', async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

r.post('/', async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

r.put('/', async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

/**
 *
 * @api {GET} /api/v1/monitor/log Get monitor logs
 * @apiName getMonitorLogs
 * @apiGroup monitor
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} mid monitor.mid
 * @apiParam  {String} limit log limit, default is 1000
 *
 */
r.get('/log', async (req, res, next) => {
  try {
    var uid = req.session.user.uid
    var mid = req.query.mid
    var limit = req.query.limit
    var logs = await dbMonitor.getMonitorLogs(mid, uid, limit)
    res.json(new DataMessage(logs))
  } catch (error) {
    next(error)
  }
})

module.exports = r
