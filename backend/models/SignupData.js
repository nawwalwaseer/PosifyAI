//THIS IS FOR COMMENT OUTED CODE IN SIGNUP ROUTE

const mongoose = require('mongoose');

// Define SignupData schema
const signupDataSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // (confirmPassword is not saved)
  address: { type: String },
  businessName: { type: String },
  category: { type: String },
  phoneNumber: { type: String },
  billingInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const SignupData = mongoose.model('SignupData', signupDataSchema);

module.exports = SignupData;
