// routes/salesRoute.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET all sales data
router.get('/sales', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const salesDoc = await db.collection('salesdata').findOne();

    if (!salesDoc || !salesDoc.sales) {
      return res.status(404).json({ message: "Sales data not found" });
    }

    res.json({ sales: salesDoc.sales });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
