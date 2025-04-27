// routes/signup.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
      businessName,
      category,
      billingInfo,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phone,
      businessName,
      category,
      billingInfo,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed. Try again." });
  }
});

module.exports = router;

//********************************UPDATED ROUTE FOR SAVING ALL THE DATA**********************************/
// const express = require('express');
// const router = express.Router();
// const SignupData = require('../models/SignupData'); // your full signup details model
// const User = require('../models/User'); // your login auth model
// const bcrypt = require('bcryptjs');

// router.post('/signup', async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       address,
//       businessName,
//       category,
//       phoneNumber,
//       billingName,
//       billingCardNumber,
//       billingExpiry,
//       billingCVV,
//     } = req.body;

//     // Validation
//     if (!email || !password || !confirmPassword || !firstName || !lastName || !address || !businessName || !category || !phoneNumber || !billingName || !billingCardNumber || !billingExpiry || !billingCVV) {
//       return res.status(400).json({ message: "Please fill all required fields" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Save basic user login
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();

//     // Save all signup data
//     const signupData = new SignupData({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword, // Store hashed password
//       address,
//       businessName,
//       category,
//       phoneNumber,
//       billingInfo: {
//         billingName,
//         billingCardNumber,
//         billingExpiry,
//         billingCVV,
//       },
//     });
//     await signupData.save();

//     res.status(201).json({ message: "User signed up successfully" });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;
