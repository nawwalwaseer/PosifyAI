const mongoose = require('mongoose');

// Schema that allows dynamic keys
const customerSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Customer', customerSchema);
