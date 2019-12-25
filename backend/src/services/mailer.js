const nodemailer = require('nodemailer')
const Email = require('email-templates')

exports.send = ({ email, item, items }) => {
  const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USER,
    MAIL_PASSWORD,
    MAIL_FROM,
  } = process.env

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  })
  const emailToSend = new Email({
    message: {
      from: MAIL_FROM,
    },
    send: true,
    transport: transporter,
  })
  emailToSend.send({
    template: 'newsletter',
    message: {
      to: email,
    },
    locals: {
      search: item,
      items,
    },
  })
}
