var rp = require('request-promise')
var CronJob = require('cron').CronJob
var dbMonitor = require('./db.monitor')
var MonitorLog = require('../type/MonitorLog')
var _ = require('lodash')
var P = require('bluebird')
var logger = require('./logger')('lib.cronjob')

async function logAllMonitors () {
  var monitors = await dbMonitor.allMonitors()
  var requests = _.map(monitors, async m => {
    try {
      var r = await rp({
        uri: m.target, time: true, timeout: 30 * 1000
      })
      return dbMonitor.addMonitorLog(new MonitorLog(m.mid, true, r.timingPhases.total))
    } catch (error) {
      logger.debug(`GET ${m.target}: ${error.message}`)
      return dbMonitor.addMonitorLog(new MonitorLog(m.mid, false, 30 * 1000))
    }
  })
  return P.all(requests)
}

function startCronJob () {
  // Run logAllMonitors when each '0' second
  var job = new CronJob('* * * * * 0', logAllMonitors)
  job.start()
  return job
}

module.exports = {
  logAllMonitors, startCronJob
}
