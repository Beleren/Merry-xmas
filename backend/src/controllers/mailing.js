const { CronJob } = require('cron')
const User = require('../models/User')
const Meli = require('../services/meli')
const Mailer = require('../services/mailer')

exports.findOrUpdate = async (req, res, next) => {
  try {
    const { email, interval, item } = req.body
    req.item = item
    // https://stackoverflow.com/a/41502103/8128330
    const updatedUser = await User.findOneAndUpdate(
      { email, 'items.name': { $ne: item } },
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
    const { interval } = req.body
    const { user, item } = req
    const task = new CronJob(`*/${interval} * * * * *`, async () => {
      // sorted is needed because there is no sort param to query search
      const meliSearch = await Meli.search(item)
      const sortedSearch = meliSearch.results.sort((a, b) => a.price - b.price)
      const items = sortedSearch.slice(0, 3)
      Mailer({ email: user.email, item, items })
    })
    task.start()
    res.send({
      message: 'Email was successfully scheduled!',
    })
  } catch (error) {
    res.status(500).send({ message: 'Could not send email', error })
  }
}
