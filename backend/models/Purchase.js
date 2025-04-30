const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
  productName: String,
  stock: Number,
  quantity: Number,
  rate: Number,
  total: Number,
});

const purchaseSchema = new mongoose.Schema({
  supplier: String,
  date: Date,
  invoiceNo: String,
  paymentType: String,
  details: String,
  items: [itemSchema],
  total: Number,
  discount: Number,
  grandTotal: Number,
  paidAmount: Number,
  dueAmount: Number,
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;