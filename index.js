const express = require('express')
const mongoose = require('mongoose')
const User = require('./Models/User')

const app = express()
// Connect to MongoDB
mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', async (req, res) => {
  try {
    const newUser = new User({
      email: 'teste@teste.com',
      interval: 69420911,
    })
    const persistedUser = await newUser.save()
    res.send(persistedUser)
  } catch (error) {
    res.status(500).send({ message: 'Deu ruim!', error })
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})
