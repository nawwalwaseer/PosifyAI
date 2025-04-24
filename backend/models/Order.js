const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  productList: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);