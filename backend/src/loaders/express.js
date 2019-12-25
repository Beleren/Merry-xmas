const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = async ({ app }) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  return app
}
