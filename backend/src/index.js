const express = require('express')
const loaders = require('./loaders')
require('dotenv').config()
const UserController = require('./controllers/user')

async function startServer() {
  const app = express()
  await loaders({ expressApp: app })

  app.post('/subscribe', UserController.subscribe)
  app.get('/list', UserController.list)
  app.put('/unsubscribe', UserController.unsubscribe)
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`Your server is ready !`)
  })
}

startServer()
