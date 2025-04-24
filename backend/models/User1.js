const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  profileImage: String
});
module.exports = mongoose.model('User1', UserSchema);