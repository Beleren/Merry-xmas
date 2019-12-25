const mongoose = require('mongoose')

const mongooseLoader = async () => {
  const connection = await mongoose.connect(
    `mongodb://mongo:${process.env.MONGODB_PORT}/${process.env.DOCKER_CONTAINER}`,
    {
      useNewUrlParser: true,
    }
  )
  return connection.connection.db
}

module.exports = mongooseLoader
