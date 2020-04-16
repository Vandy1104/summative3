// Pearly
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  message : String,
  postby : String,
  date : String,
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  product_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  },
})

module.exports = mongoose.model('Comment', commentSchema);
