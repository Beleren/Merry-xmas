const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  interval: { type: Number, required: true },
});

module.exports = mongoose.model("User", UserSchema);
