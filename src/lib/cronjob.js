var rp = require('request-promise')
var CronJob = require('cron').CronJob
var dbMonitor = require('./db.monitor')
var MonitorLog = require('../type/MonitorLog')
var _ = require('lodash')
var P = require('bluebird')
var logger = require('./logger')('lib.cronjob')
var mailer = require('./mailer')

async function logAllMonitors () {
  var monitors = await dbMonitor.allMonitorsWithStatus()
  var requests = _.map(monitors, async m => {
    try {
      switch (m.type) {
        case 'HTTP':
          var r = await rp({
            method: 'HEAD',
            uri: m.target,
            time: true,
            timeout: 30 * 1000,
            resolveWithFullResponse: true
          })
          if (m.latest_is_success === '0') {
            mailer.send_restore_mail(m.uname, m)
          }
          return dbMonitor.addMonitorLog(
            new MonitorLog(m.mid, true, r.timingPhases.total)
          )
        case 'TCP':
          logger.error('Monitor not support TCP now !')
          break
        default:
          logger.error(`Unknown monitor type, mid is ${m.mid}`)
          break
      }
    } catch (error) {
      if (m.latest_is_success === '1') {
        mailer.send_down_mail(m.uname, m)
      }
      logger.debug(`GET ${m.target}: ${error.message}`)
      return dbMonitor.addMonitorLog(new MonitorLog(m.mid, false, 30 * 1000))
    }
  })
  return P.all(requests)
}

function startCronJob () {
  // Run logAllMonitors every minute
  var job = new CronJob('* * * * *', logAllMonitors)
  job.start()
  return job
}

module.exports = {
  logAllMonitors,
  startCronJob
}
