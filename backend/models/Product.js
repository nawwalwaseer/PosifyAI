// models/Product.js
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the product model
module.exports = mongoose.model('Product', productSchema);
