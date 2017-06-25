var node_mailer = require('nodemailer')
var config = require('../config')
var bluebird = require('bluebird')
var transpoert = bluebird.promisifyAll(node_mailer.createTransport(config.MAIL))

async function send_mail (to, title, content, html = '') {
  return transpoert.sendMailAsync({
    from: `Monitor <${config.MAIL.auth.user}>`,
    to: to,
    subject: title,
    text: content,
    html: html
  })
}

async function send_new_token (to, token) {
  return send_mail(to, 'Monitor Token', '', `<div>Hi ${to}.</div><div>Your new token is <strong>${token}</strong>, and previous tokens will be invalid (if have)</div><div>&nbsp;</div><div>Best regards.</div><div>Your Monitor</div>`)
}

module.exports = {
  send_mail, send_new_token
}
