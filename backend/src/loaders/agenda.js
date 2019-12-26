const Agenda = require('agenda')

module.exports = ({ mongoConnection }) => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: process.env.AGENDA_COLLECTION },
    processEvery: process.env.AGENDA_PROCESS_INTERVAL,
    maxConcurrency: process.env.AGENDA_CONCURRENCY,
  })
}
