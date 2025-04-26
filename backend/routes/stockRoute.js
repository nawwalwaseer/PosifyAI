// routes/stockRoute.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET all stock data
router.get('/stock', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const stockDoc = await db.collection('stockdata').findOne();  // Find the document containing the stock data

    if (!stockDoc || !stockDoc.stock) {
      return res.status(404).json({ message: "Stock data not found" });
    }

    res.json({ stock: stockDoc.stock });  // Return the stock array
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
