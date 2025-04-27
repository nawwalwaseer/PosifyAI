// routes/voucher.js
const express = require('express');
const Voucher = require('../models/Voucher'); // Assuming the Voucher model is in models/Voucher.js

const router = express.Router();

// GET all vouchers
router.get('/vouchers', async (req, res) => {
  try {
    const vouchers = await Voucher.find(); // Fetch all vouchers
    res.status(200).json(vouchers); // Send the data as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching voucher data' });
  }
});

module.exports = router;
