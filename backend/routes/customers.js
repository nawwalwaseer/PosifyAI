const express = require('express');
const router = express.Router(); // ✅ define router properly
const mongoose = require('mongoose');

// Fetch the customers data
router.get('/customers', async (req, res) => {
    try {
      const db = mongoose.connection.db;
      const data = await db.collection('customerdata').findOne();
  
      if (!data) {
        return res.status(404).json({ message: 'Customer data not found' });
      }
  
      res.json({
        customerLedger: data.customerLedger || [],
        customerSatisfaction: data.customerSatisfaction || [],
      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  


module.exports = router;
