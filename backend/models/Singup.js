// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street: String,
    street2: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
  },
  phone: String,
  businessName: String,
  category: String,
  billingInfo: {
    name: String,
    cardNumber: String,
    expiry: String,
    cvv: String,
  },
});

module.exports = mongoose.model("User", userSchema);
