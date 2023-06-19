const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Id: String,
  displayName: String,
});

module.exports = mongoose.model('User', userSchema);
