const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const meli = require('mercadolibre')
const User = require('./Models/User')

const app = express()
// Connect to MongoDB
mongoose
  .connect(`mongodb://mongo:27017/${process.env.DOCKER_CONTAINER}`, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/meli', (req, res) => {
  const meliObject = new meli.Meli(
    process.env.MELI_CLIENT_ID,
   process.env.MELI_CLIENT_SECRET 
  )
  meliObject.get('/sites/MLA/search?q=Motorola%20G6', (err, data) => {
    if (err) return res.status(500).send(err)
    return res.send(data)
  })
})

app.get('/', async (req, res) => {
  try {
    const newUser = new User({
      email: 'leandroharuki@gmail.com',
      interval: 69420911,
    })
    const persistedUser = await newUser.save()
    res.send(persistedUser)
  } catch (error) {
    res.status(500).send({ message: 'Deu ruim!', error })
  }
})

app.get('/mail', (req, res) => {
  const mailOptions = {
    from: 'teste@teste.com',
    to: 'fulano@teste.com',
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send',
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })
  const task = cron.schedule('* * * * *', () => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.status(500).send(error)
      } else {
        res.send({ message: 'Email sent', info: info.response })
      }
    })
  })
  task.start()
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})
