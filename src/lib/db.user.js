var db = require('./db')

async function addUser (user) {
  return db.queryAsync('INSERT INTO `user` set ?', user)
}

async function findUser (user) {
  return db.queryAsync('SELECT * FROM `user` WHERE `uanme` = ? and `utoken` = ? limit 1', [user.uname, user.utoken])
}

async function updateUser (user) {
  return db.queryAsync('UPDATE `user` SET `utoken`=? WHERE uname`=?', [user.utoken, user.uname])
}

module.exports = {
  addUser,
  findUser,
  updateUser
}
