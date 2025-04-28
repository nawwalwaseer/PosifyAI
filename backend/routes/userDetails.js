// routes/userDetails.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to get user details (no authentication required)
router.get('/user-details', async (req, res) => {
  try {
    // Get the userId from the query parameter or directly from the request body
    const { userId } = req.query; // or req.body depending on your front-end request

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back only the firstName (you can extend this to other fields if needed)
    res.status(200).json({ firstName: user.firstName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
