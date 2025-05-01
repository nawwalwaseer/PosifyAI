const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  barcode: String,
  productName: { type: String, required: true },
  sn: String,
  model: String,
  category: { type: String, required: true },
  salePrice: { type: String, required: true },
  unit: { type: String, required: true },
  vat: String,
  gts: String,
  supplier: String,
  supplierPrice: String,
  details: String,
}, { timestamps: true });

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
