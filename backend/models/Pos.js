const mongoose = require("mongoose");

const posSchema = new mongoose.Schema({
  billId: { type: String, required: true },
  storeId: { type: String, required: true },
  storeName: { type: String, required: true },
  organisationId: { type: String, required: true },
  organisationName: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product schema
      code: { type: String, required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      discVal: { type: Number, required: true },
      sc: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  salesTax: { type: Number, required: true },
  serviceCh: { type: Number, required: true },
  withholdingTax: { type: Number, required: true },
  totalQty: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  totalDiscount: { type: Number, required: true },
  netAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Pos = mongoose.model("Pos", posSchema);
module.exports = Pos;
