const EmailSequenceJob = require('../jobs/emailSequence')

module.exports = ({ agenda }) => {
  agenda.define(
    'send-email',
    { priority: 'high', concurrency: 10 },
    EmailSequenceJob.handler
  )

  agenda.start()
}
