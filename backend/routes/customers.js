const express = require('express');
const router = express.Router(); // ✅ define router properly
const mongoose = require('mongoose');
const Customer = require('../models/customer'); // Ensure the correct path to the Customer model


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

router.post('/saveCustomer', async (req, res) => {
    try {
      const customerData = req.body; // Get the customer data from the request body
      // console.log('Customer data received:', customerData); // Log the received data
  
      // Generate a dynamic key like "customer 1 data", "customer 2 data", etc.
      const customerCount = await Customer.countDocuments();
      const customerKey = `customer ${customerCount + 1} data`;
  
      // Create a new customer document with the dynamic key
      const newCustomer = new Customer({
        [customerKey]: customerData, // Store the data under the generated key
      });
  
      // Save the new customer document to the database
      await newCustomer.save();
  
      // Respond with a success message
      res.status(200).send({ message: 'Customer data saved successfully!' });
    } catch (error) {
      console.error('Error saving customer data:', error); // Log the error details
      res.status(500).send({ error: 'Failed to save customer data' });
    }
  });
    


module.exports = router;
