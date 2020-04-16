// Pearly
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  category : String,
  businessName : String,
  productName : String,
  price : Number,
  flavour : String,
  description : String,
  productImageUrl : String,
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
})

module.exports = mongoose.model('Product', productSchema);
