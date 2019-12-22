const nodemailer = require('nodemailer')
const { CronJob } = require('cron')
const Email = require('email-templates')
const User = require('../models/User')
const Meli = require('../services/meli')

exports.findOrUpdate = async (req, res, next) => {
  try {
    const { email, interval, item } = req.body
    req.item = item
    // https://stackoverflow.com/a/41502103/8128330
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { items: { name: item, interval } } },
      { new: true, upsert: true, runValidators: true }
    )
    if (updatedUser) {
      req.user = updatedUser
    }
    next()
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.save = async (req, res, next) => {
  try {
    if (req.user) return next()
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
    req.user = await newUser.save()
    return next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.send = async (req, res) => {
  try {
    const {
      MAIL_HOST,
      MAIL_PORT,
      MAIL_USER,
      MAIL_PASSWORD,
      MAIL_FROM,
    } = process.env

    const { interval } = req.body
    const { user, item } = req
    const meliSearch = await Meli.search(item)
    const items = meliSearch.results.slice(0, 3)
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

    const task = new CronJob(`*/${interval} * * * * *`, function() {
      emailToSend.send({
        template: 'newsletter',
        message: {
          to: user.email,
        },
        locals: {
          search: item,
          items,
        },
      })
    })
    task.start()
    res.send({
      message: 'Email was successfully scheduled!',
      items,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
