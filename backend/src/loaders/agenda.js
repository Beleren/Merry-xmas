const Agenda = require('agenda')

module.exports = ({ mongoConnection }) => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: 'jobs' },
    processEvery: 'one minute',
    maxConcurrency: 10,
  })
}
