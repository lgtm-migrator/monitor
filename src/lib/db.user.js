var db = require('./db')

async function addUser (user) {
  return db.queryAsync('INSERT INTO `user` set ?', user)
}

async function findUser (user) {
  var users = await db.queryAsync('SELECT * FROM `user` WHERE `uname` = ? and `utoken` = ? limit 1', [user.uname, user.utoken])
  if (users.length > 0) {
    return users[0]
  } else {
    throw new Error(`${user.uname}: No such user, or user token not correct !`)
  }
}

async function updateUser (user) {
  return db.queryAsync('UPDATE `user` SET `utoken`=? WHERE `uname`=?', [user.utoken, user.uname])
}

module.exports = {
  addUser,
  findUser,
  updateUser
}
