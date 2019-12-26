const { Container } = require('typedi')

exports.subscribe = ({ email, interval, item }) => {
  const agenda = Container.get('agendaInstance')
  const userSubscription = agenda.create('send-email', { email, item })
  userSubscription.repeatEvery(`${interval} seconds`).save()
}
