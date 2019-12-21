const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const { CronJob } = require('cron')
const meli = require('mercadolibre')
const Email = require('email-templates')

const User = require('./models/User')

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
  .catch(err => console.log(err))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/meli', (req, res) => {
  const { item = '' } = req.query
  const query = encodeURI(item)
  const meliObject = new meli.Meli(
    process.env.MELI_CLIENT_ID,
    process.env.MELI_CLIENT_SECRET
  )
  meliObject.get(`/sites/MLA/search?q=${query}`, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.send(data)
  })
})

// https://stackoverflow.com/a/41502103/8128330
app.use('/email', async (req, res, next) => {
  try {
    const { email, interval, item } = req.body
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { items: { name: item, interval } } },
      { new: true, upsert: true }
    )

    if (updatedUser) return res.send(updatedUser)

    return next()
  } catch (error) {
    return res.status(500).send('deu ruim!', error)
  }
})
app.post('/email', async (req, res) => {
  try {
    const { email, interval, item } = req.body
    const newUser = new User({
      email,
      items: [
        {
          name: item,
          interval,
        },
      ],
    })
    const persistedUser = await newUser.save()
    res.send(persistedUser)
  } catch (error) {
    res.status(500).send({ message: 'Deu ruim!', error })
  }
})

app.get('/mail', (req, res) => {
  const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USER,
    MAIL_PASSWORD,
    MAIL_FROM,
  } = process.env

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  })

  const email = new Email({
    message: {
      from: MAIL_FROM,
    },
    send: true,
    transport: transporter,
  })

  const task = new CronJob('* * * * *', () => {
    email.send({
      template: 'newsletter',
      message: {
        to: 'elon@spacex.com',
      },
      locals: {
        name: 'Elon',
      },
    })
  })
  task.start()
  res.send('Email was successfully scheduled!')
})

app.listen(process.env.API_PORT, () => {
  console.log('Server listening on port 3000!')
})
