const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, require: true },
  frequency: { type: Number, require: true },
  log: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
  }]
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;