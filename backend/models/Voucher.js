// models/Voucher.js
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    voucherNo: { type: String, required: true },
    date: { type: String, required: true },
    remark: { type: String, required: true },
    debit: { type: String, required: true },
    credit: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voucher', voucherSchema);
