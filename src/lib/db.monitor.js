var db = require('./db')

async function addMonitor (monitor) {
  return db.queryAsync('INSERT INTO `monitor` set ?', monitor)
}

async function allMonitors () {
  return db.queryAsync('SELECT * FROM `monitor`')
}

/**
 * Each user will take latest_is_success and uname fields
 *
 * @returns {Promise<Array<Object>>}
 */
async function allMonitorsWithStatus () {
  return db.queryAsync('SELECT * FROM `v_monitor_with_status`')
}

async function userMonitors (user) {
  return db.queryAsync('SELECT * FROM `monitor` where uid = ?', [user.uid])
}

async function addMonitorLog (monitorLog) {
  // send mail if failed
  return db.queryAsync('INSERT INTO `monitor_log` set ?', monitorLog)
}

module.exports = {
  addMonitor,
  allMonitors,
  addMonitorLog,
  userMonitors,
  allMonitorsWithStatus
}
