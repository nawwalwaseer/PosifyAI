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

router.post('/sales', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('salesdata');
    const newSales = req.body.sales; // expecting an array of sales

    if (!Array.isArray(newSales) || newSales.length === 0) {
      return res.status(400).json({ message: 'Invalid sales data format' });
    }

    // Append new sales to the sales array
    const result = await collection.updateOne(
      {},
      { $push: { sales: { $each: newSales } } },
      { upsert: true } // creates the document if it doesn't exist
    );

    if (result.modifiedCount === 0 && !result.upsertedId) {
      return res.status(500).json({ message: 'Failed to insert sales' });
    }

    res.status(201).json({ message: 'Sales added successfully' });
  } catch (error) {
    console.error('Error saving sales data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
