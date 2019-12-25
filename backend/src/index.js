const express = require('express')
const loaders = require('./loaders')
require('dotenv').config()
const Mailing = require('./controllers/mailing')

async function startServer() {
  const app = express()
  await loaders({ expressApp: app })

  app.post('/subscribe', Mailing.findOrUpdate, Mailing.save, Mailing.send)
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`Your server is ready !`)
  })
}

startServer()
