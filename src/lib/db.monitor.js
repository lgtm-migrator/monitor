var db = require('./db')

async function addMonitor (monitor) {
  return db.queryAsync('INSERT INTO `monitor` set ?', monitor)
}

async function allMonitors () {
  return db.queryAsync('SELECT * FROM `monitor`')
}

async function addMonitorLog (monitorLog) {
  // send mail if failed
  return db.queryAsync('INSERT INTO `monitor_log` set ?', monitorLog)
}

module.exports = { addMonitor, allMonitors, addMonitorLog }
