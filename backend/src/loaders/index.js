const { Container } = require('typedi')
const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const agendaLoader = require('./agenda')
const jobsLoader = require('./jobs')

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader()
  const agenda = agendaLoader({ mongoConnection })
  Container.set('agendaInstance', agenda)
  await jobsLoader({ agenda })
  await expressLoader({ app: expressApp })
  await new Promise(resolve => agenda.once('ready', resolve))
  console.log('Express Intialized')
}
