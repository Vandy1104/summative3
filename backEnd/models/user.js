// Pearly
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  profileImgUrl : String,
  username : String,
  firstName : String,
  lastName : String,
  email : String,
  password : String,
  businessName : String,
  businessAbout : String
})

module.exports = mongoose.model('User', userSchema);
