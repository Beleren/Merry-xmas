const nodemailer = require('nodemailer')
const { CronJob } = require('cron')
const Email = require('email-templates')
const User = require('../models/User')

exports.updateOrPass = async (req, res, next) => {
  try {
    const { email, item, interval } = req.body
    // https://stackoverflow.com/a/41502103/8128330
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { items: { name: item, interval } } },
      { new: true, upsert: true }
    )
    if (updatedUser) return res.send(updatedUser)
    return next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.save = async (req, res) => {
  try {
    const { email, interval, item } = req.body
    const newUser = new User({
      email,
      items: [
        {
          name: item,
          interval,
        },
      ],
    })
    const persistedUser = await newUser.save()
    res.send(persistedUser)
  } catch (error) {
    res.status(500).send({ message: 'Deu ruim!', error })
  }
}

exports.send = (req, res) => {
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

  const email = new Email({
    message: {
      from: MAIL_FROM,
    },
    send: true,
    transport: transporter,
  })

  const task = new CronJob('* * * * *', () => {
    email.send({
      template: 'newsletter',
      message: {
        to: 'elon@spacex.com',
      },
      locals: {
        name: 'Elon',
      },
    })
  })
  task.start()
  res.send('Email was successfully scheduled!')
}
