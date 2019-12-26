const { Container } = require('typedi')

exports.subscribe = ({ email, interval, item }) => {
  const agenda = Container.get('agendaInstance')
  const userSubscription = agenda.create('send-email', { email, item })
  userSubscription.repeatEvery(`${interval} seconds`).save()
}

exports.unsubscribe = async ({ email, item }) => {
  try {
    let removed = null
    const agenda = Container.get('agendaInstance')
    const [job] = await agenda.jobs(
      { 'data.email': email, 'data.item': item },
      { data: -1 },
      1
    )
    if (job) removed = job.remove()
    return removed
  } catch (error) {
    throw Error(error)
  }
}
