const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  displayName: String,
  robots: [{
    code: String
  }]
});

module.exports = mongoose.model('User', userSchema);
