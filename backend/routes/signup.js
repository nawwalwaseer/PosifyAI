// routes/signup.js
const express = require('express');
const router = express.Router();
const SignupData = require('../models/SignupData');

// POST route for signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, businessName, phone } = req.body;

  // Check if all fields are provided
  if (!firstName || !lastName || !email || !businessName || !phone) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    // Check if the email already exists
    const existingUser = await SignupData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Create a new SignupData document
    const newSignupData = new SignupData({
      firstName,
      lastName,
      email,
      businessName,
      phone,
    });

    // Save the new signup data to the database
    await newSignupData.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving data' });
  }
});

module.exports = router;


// // routes/signup.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const SignupData = require('../models/SignupData'); // Use SignupData model
// const router = express.Router();

// // Signup route to handle POST request
// router.post('/signup', async (req, res) => {
//   try {
//     console.log(req.body)
//     const { firstName, lastName, email,password, phone, businessName } = req.body;

//     // Validation check for required fields
//     if (!firstName || !lastName || !email || !password || !phone || !businessName) {
//       return res.status(400).json({ message: 'Please fill all required fields' });
//     }

//     // Check if the user already exists (by email)
//     const existingUser = await SignupData.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new SignupData({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phone,
//       businessName,
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send success response
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Signup failed. Try again.' });
//   }
// });

// module.exports = router;
