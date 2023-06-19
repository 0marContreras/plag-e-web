const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  displayName: String,
});

module.exports = mongoose.model('User', userSchema);
