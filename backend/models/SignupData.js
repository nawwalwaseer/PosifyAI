// models/SignupData.js
const mongoose = require('mongoose');

const SignupDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,  // To ensure no duplicate email addresses
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
}, { timestamps: true });

const SignupData = mongoose.model('SignupData', SignupDataSchema);
module.exports = SignupData;


// // models/SignupData.js
// const mongoose = require('mongoose');

// const signupDataSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   businessName: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const SignupData = mongoose.model('SignupData', signupDataSchema);

// module.exports = SignupData;
