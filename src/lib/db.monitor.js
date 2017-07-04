var db = require('./db').poolAsync

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

/**
 * Get Monitor of specific user
 *
 * @param {any} user
 * @returns {Promise<Array<Object>>}
 */
async function getUserMonitorsWithStatus (user) {
  return db.queryAsync(
    'SELECT * FROM `v_monitor_with_status` where uid = ?',
    [ user.uid ]
  )
}

/**
 * saveOrUpdateMonitor
 *
 * @param {any} monitor
 * @returns {Promise<Array<Object>>}
 */
async function saveOrUpdateMonitor (monitor) {
  return db.queryAsync(
    'INSERT INTO `monitor` set ? ON DUPLICATE KEY UPDATE ?',
    [monitor, monitor]
  )
}

/**
 * getUserMonitor
 *
 * @param {number} mid
 * @param {number} uid
 * @returns {Promise<Array<Object>>}
 */
async function getUserMonitor (mid, uid) {
  return db.queryAsync('SELECT * FROM `monitor` WHERE `mid` = ? `uid` = ?', [
    mid,
    uid
  ])
}

/**
 *  remove monitor with id
 *
 * @param {number} mid
 */
async function removeUserMonitor (mid, uid) {
  return db.queryAsync('DELETE FROM `monitor` WHERE `mid` = ? `uid` = ?', [
    mid,
    uid
  ])
}

/**
 * add a monitorLog
 *
 * @param {any} monitorLog
 */
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
  getUserMonitorsWithStatus,
  allMonitorsWithStatus,
  getMonitorLogs,
  removeUserMonitor,
  getUserMonitor,
  saveOrUpdateMonitor
}
