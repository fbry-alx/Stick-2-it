const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  habits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;