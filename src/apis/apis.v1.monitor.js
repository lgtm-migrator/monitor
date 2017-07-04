var r = require('express').Router()
var dbMonitor = require('../lib/db.monitor')
var DataMessage = require('../type/DataMessage')
var User = require('../type/User')
var Message = require('../type/Message')
var Monitor = require('../type/Monitor')

// ^ public ^

r.get('/', async (req, res, next) => {
  try {
    var rs = await dbMonitor.getUserMonitorsWithStatus(
      new User(req.session.user.uid)
    )
    res.json(new DataMessage(rs))
  } catch (error) {
    next(error)
  }
})

r.post('/', async (req, res, next) => {
  try {
    var monitor = new Monitor(
      req.session.user.uid,
      req.body.type,
      req.body.target
    )
    res.json(new Message((await dbMonitor.addMonitor(monitor))))
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

r.get('/:id', async (req, res, next) => {
  try {
    var mid = parseInt(req.params['id'])
    res.json(
      new Message(
        (await dbMonitor.getUserMonitor(mid, req.session.user.uid))
      )
    )
  } catch (error) {
    next(error)
  }
})

r.post('/:id', async (req, res, next) => {
  try {
    var monitor = new Monitor(
      req.session.user.uid,
      req.body.type,
      req.body.target
    )
    monitor.mid = parseInt(req.params['id'])
    res.json(new Message((await dbMonitor.saveOrUpdateMonitor(monitor))))
  } catch (error) {
    next(error)
  }
})

r.delete('/:id', async (req, res, next) => {
  try {
    var monitorId = parseInt(req.params['id'])
    res.json(
      new Message(
        (await dbMonitor.removeUserMonitor(monitorId, req.session.user.uid))
      )
    )
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
