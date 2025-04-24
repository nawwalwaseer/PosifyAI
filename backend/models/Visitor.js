const mongoose = require('mongoose');
const VisitorSchema = new mongoose.Schema({
  date: Date,
  visits: Number
});
module.exports = mongoose.model('Visitor', VisitorSchema);
