const { CronJob } = require('cron')
const User = require('../models/User')
const Meli = require('../services/meli')
const Mailer = require('../services/mailer')

exports.subscribe = async (req, res) => {
  try {
    const { email, interval, item } = req.body
    const newUser = await User.saveOrUpdate({ email, interval, item })
    const task = new CronJob(`*/${interval} * * * * *`, async () => {
      // sorted is needed because there is no sort param to query search
      const meliSearch = await Meli.search(item)
      const sortedSearch = meliSearch.results.sort((a, b) => a.price - b.price)
      const items = sortedSearch.slice(0, 3)
      Mailer.send({ email, item, items })
    })
    task.start()
    res.send(newUser)
  } catch (error) {
    res.status(500).send({ message: 'Could not send email', error })
  }
}

exports.list = async (req, res) => {
  const users = await User.find({})
  res.send(users)
}