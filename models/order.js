const mongoose = require('mongoose'); // import mongoose

const Schema = mongoose.Schema;

//define order schema of items and user data
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User' // refer to user model
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);
