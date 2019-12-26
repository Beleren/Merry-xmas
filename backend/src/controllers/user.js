const agendaService = require('../services/agenda')
const User = require('../models/User')

exports.subscribe = async (req, res) => {
  try {
    const { email, interval, item } = req.body
    const newUser = await User.saveOrUpdate({ email, interval, item })
    agendaService.subscribe({ email, interval, item })
    res.send(newUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.list = async (req, res) => {
  const users = await User.find({})
  res.send(users)
}

exports.unsubscribe = async (req, res) => {
  try {
    const { email, item } = req.body
    const nRemovedJobs = await agendaService.unsubscribe({ email, item })
    const updatedUser = await User.update(
      { email },
      { $pull: { items: { name: item } } }
    )
    res.send({ nModified: updatedUser.nModified, nRemovedJobs })
  } catch (error) {
    res.status(500).send(error)
  }
}
