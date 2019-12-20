const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  email: String,
  interval: Number
});

module.exports = User = mongoose.model('User', UserSchema);