const MailerService = require('../services/mailer')
const MELIService = require('../services/meli')

class EmailSequenceJob {
  static async handler(job, done) {
    try {
      const { email, item } = job.attrs.data
      const items = await MELIService.search(item)
      await MailerService.send({ email, item, items })
      done()
    } catch (error) {
      done(error)
    }
  }
}

module.exports = EmailSequenceJob
