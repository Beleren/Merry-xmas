const mongoose = require('mongoose')

const { Schema } = mongoose
// https://stackoverflow.com/a/24214767/8128330
const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}
const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  items: [
    {
      name: {
        type: String,
        required: 'Item name is required',
        trim: true,
        lowercase: true,
      },
      interval: {
        type: Number,
        required: true,
        min: [120, 'Interval is too short! Minimum of 120'],
        max: [1800, 'Interval is too big! Maximum of 1800'],
      },
    },
  ],
})

UserSchema.statics.saveOrUpdate = async function({ email, interval, item }) {
  let user = null
  // https://stackoverflow.com/a/41502103/8128330
  const updatedUser = await this.findOneAndUpdate(
    { email, 'items.name': { $ne: item } },
    { $push: { items: { name: item, interval } } },
    { new: true, upsert: true, runValidators: true }
  )
  if (!updatedUser) {
    const newUser = new UserSchema({
      email,
      items: [
        {
          name: item,
          interval,
        },
      ],
    })
    user = await newUser.save()
  } else user = updatedUser
  return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User
