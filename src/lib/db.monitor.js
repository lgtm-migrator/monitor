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

async function getUserMonitors (user) {
  return db.queryAsync('SELECT * FROM `monitor` where uid = ?', [user.uid])
}

async function addMonitorLog (monitorLog) {
  // send mail if failed
  return db.queryAsync('INSERT INTO `monitor_log` set ?', monitorLog)
}

/**
 *  Get Monitor Logs
 *
 * @param {string} mid
 * @param {string} uid
 * @param {number} [limit=1000]
 * @returns
 */
async function getMonitorLogs (mid, uid, limit = 1000) {
  return db.queryAsync(
    'SELECT * FROM `v_monitor_log_with_user_and_monitor_info` where mid = ? and uid = ? limit ?',
    [mid, uid, limit]
  )
}

module.exports = {
  addMonitor,
  allMonitors,
  addMonitorLog,
  getUserMonitors,
  allMonitorsWithStatus,
  getMonitorLogs
}
