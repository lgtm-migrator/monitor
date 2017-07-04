var nodeMailer = require('nodemailer')
var config = require('../config')
var bluebird = require('bluebird')
var transpoert = bluebird.promisifyAll(
  nodeMailer.createTransport(config.MAIL)
)

async function sendMail (to, title, content, html = '') {
  return transpoert.sendMailAsync({
    from: `Monitor <${config.MAIL.auth.user}>`,
    to: to,
    subject: title,
    text: content,
    html: html
  })
}

async function sendNewToken (to, token) {
  return sendMail(
    to,
    'Monitor Token',
    '',
    `<div>Hi ${to}.</div><div>Your new token is <strong>${token}</strong>, and previous tokens will be invalid (if have)</div><div>&nbsp;</div><div>Best regards.</div><div>Your Monitor</div>`
  )
}

async function sendDownMail (to, monitor) {
  return sendMail(
    to,
    'Monitor Target Down Message',
    '',
    `<p>Hi ${to}.</p><div>Monitor:&nbsp;<strong>${monitor.target}&nbsp;</strong>is down, please check that. (Monitor will not notify you until the target works well)</div><div>&nbsp;</div><div>Best regards.</div><div>Your Monitor</div>`
  )
}

async function sendRestoreMail (to, monitor) {
  return sendMail(
    to,
    'Monitor Target Restored Message',
    '',
    `<p><p>Hi ${to}.</p><div>Monitor:&nbsp;<strong>${monitor.target}&nbsp;</strong>is restored</div><div>&nbsp;</div><div>Best regards.</div><div>Your Monitor</div></div>`
  )
}

module.exports = {
  sendMail,
  sendNewToken,
  sendDownMail,
  sendRestoreMail
}
