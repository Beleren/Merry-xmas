const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader()
  console.log('MongoDB Intialized')
  await expressLoader({ app: expressApp })
  console.log('Express Intialized')
}
