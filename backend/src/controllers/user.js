const { Container } = require('typedi')
const User = require('../models/User')

exports.subscribe = async (req, res) => {
  try {
    const { email, interval, item } = req.body
    const newUser = await User.saveOrUpdate({ email, interval, item })
    const agenda = Container.get('agendaInstance')
    agenda.schedule('in 5 seconds', 'send-email', { email, item })
    res.send(newUser)
  } catch (error) {
    res.status(500).send({ message: 'Could not send email', error })
  }
}

exports.list = async (req, res) => {
  const users = await User.find({})
  res.send(users)
}
