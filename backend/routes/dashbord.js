// routes/dashboard.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Fetch the dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const dashboardData = await db.collection('dashboardstats').findOne();
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
