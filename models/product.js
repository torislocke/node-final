const mongoose = require('mongoose'); // import mongoose

const Schema = mongoose.Schema; // use mongoose object for schema constructor

// extantiate schema with new schema and key value pairs with type and if required
const productSchema = new Schema({
  // forces object to have a title, price, description, imageUrl
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


// model function connects the schema blueprint to name i.e., product
module.exports = mongoose.model('Product', productSchema);

