var db = require('./db')

async function addUser (user) {
  return db.query('INSERT INTO `user` set ?', user)
}

async function findUser (user) {
  return db.query('SELECT * FROM `user` WHERE `uanme` = ? and `utoken` = ? limit 1', [user.uname, user.utoken])
}

async function updateUser (user) {

}

module.exports = {
  addUser,
  findUser,
  updateUser
}
