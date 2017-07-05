var r = require('express').Router()
var dbMonitor = require('../lib/db.monitor')
var DataMessage = require('../type/DataMessage')
var Message = require('../type/Message')
var Monitor = require('../type/Monitor')

// ^ public ^

/**
 *
 * @api {GET} /apis/v1/monitor Get Current User Monitors
 * @apiName Get Current User Monitors
 * @apiGroup monitor
 * @apiVersion  1.0.0
 *
 */

r.get('/', async (req, res, next) => {
  try {
    var rs = await dbMonitor.getUserMonitorsWithStatus({
      uid: req.session.user.uid
    })
    res.json(new DataMessage(rs))
  } catch (error) {
    next(error)
  }
})

/**
 *
 * @api {POST} /apis/v1/monitor Create Monitor
 * @apiName Create Monitor
 * @apiGroup monitor
 * @apiVersion  1.0.0
 *
 *
 * @apiParam {string} type monitor type, HTTP or TCP
 * @apiParam {string} target monitor target, a uri or host:port string
 *
 */

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

/**
 *
 * @api {GET} /apis/v1/monitor/:mid Get Specific Monitor
 * @apiName Get Specific Monitor
 * @apiGroup monitor
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} mid monitor id
 */

r.get('/:id', async (req, res, next) => {
  try {
    var mid = parseInt(req.params['id'])
    res.json(
      new Message((await dbMonitor.getUserMonitor(mid, req.session.user.uid)))
    )
  } catch (error) {
    next(error)
  }
})

/**
 *
 * @api {POST} /apis/v1/monitor/:mid Upsert Monitor
 * @apiName Upsert Monitor
 * @apiGroup monitor
 * @apiVersion  1.0.0
 * @apiDescription update a monitor, create when it's not exist
 *
 * @apiParam  {String} mid minitor id
 * @apiParam {string} type monitor type, HTTP or TCP
 * @apiParam {string} target monitor target, a uri or host:port string
 *
 */

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

/**
 *
 * @api {DELETE} /apis/v1/monitor/:mid Delete Specific Monitor
 * @apiName Delete Specific Monitor
 * @apiGroup monitor
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} mid monitor id
 */

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
 * @api {GET} /api/v1/monitor/:mid/log Get monitor logs
 * @apiName getMonitorLogs
 * @apiGroup monitorlog
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {number} mid monitor mid
 * @apiParam  {String} limit=1000 logs limit
 *
 */
r.get('/:mid/logs', async (req, res, next) => {
  try {
    var uid = req.session.user.uid
    var mid = req.params['mid']
    var limit = req.query.limit
    var logs = await dbMonitor.getMonitorLogs(mid, uid, limit)
    res.json(new DataMessage(logs))
  } catch (error) {
    next(error)
  }
})

module.exports = r
