const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const robotSchema = new Schema({
  code: String,
  Rname: String,
  waste: Number,
  location: {
    x: Number,
    y: Number
  }
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;
