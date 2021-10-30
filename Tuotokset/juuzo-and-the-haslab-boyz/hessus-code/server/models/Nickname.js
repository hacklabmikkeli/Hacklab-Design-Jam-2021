const mongoose = require('mongoose');


  const nicknameSchema = mongoose.Schema({
    name: String,
    mac: String,
  });

  module.exports = mongoose.model('Nickname', nicknameSchema);