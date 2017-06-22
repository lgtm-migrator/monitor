var node_mailer = require('nodemailer')
var config = require('../config')
var bluebird = require('bluebird')
var mailerInstance = node_mailer.createTransport(config.mail)
var mailerSendMail = bluebird.promisify(mailerInstance.sendMail)

async function send_mail (to, title, content) {
  return mailerSendMail({
    from: `${config.NAME} <${config.mail.auth.user}>`,
    to: to,
    subject: title,
    text: content
  })
}

module.exports = {
  send_mail
}
