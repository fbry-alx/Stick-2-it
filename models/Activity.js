const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  notes: { type: String },
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;