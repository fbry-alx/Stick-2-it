const mongoose = require('mongoose');

const connectionString = "mongodb://localhost:27017/habit";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('mongo db connected...');
}).catch((err) => {
  console.log('mongo error ' + err);
});

module.exports = {
  Activity: require('./Activity'),
  Habit: require('./Habit'),
  User: require('./User'),
};