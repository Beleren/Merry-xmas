const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const Mailing = require('./controllers/mailing')

const app = express()
// Connect to MongoDB
mongoose
  .connect(
    `mongodb://mongo:${process.env.MONGODB_PORT}/${process.env.DOCKER_CONTAINER}`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/subscribe', Mailing.findOrUpdate, Mailing.save, Mailing.send)

app.listen(process.env.API_PORT, () => {
  console.log('Server listening on port 3000!')
})
