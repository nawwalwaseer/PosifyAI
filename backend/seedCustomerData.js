require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Combined Customer Data
const customerData = {
  customerLedger: [
    {
      date: "09/09/24",
      description: "Mishba (Counter sale)",
      voucherNo: "0010",
      debit: "0 RS",
      credit: "5000 RS",
      balance: "5000 RS",
    },
    {
      date: "09/10/24",
      description: "Hassaan (LHR retail store)",
      voucherNo: "0110",
      debit: "15000 RS",
      credit: "0 RS",
      balance: "15000 RS",
    },
    {
      date: "07/10/24",
      description: "Jasid (scheme sale)",
      voucherNo: "0114",
      debit: "0 RS",
      credit: "5000 RS",
      balance: "5000 RS",
    },
  ],

  customerSatisfaction: [
    { month: "Jan", lastMonth: 3000, thisMonth: 4000 },
    { month: "Feb", lastMonth: 3200, thisMonth: 4200 },
    { month: "Mar", lastMonth: 3100, thisMonth: 4500 },
    { month: "Apr", lastMonth: 3400, thisMonth: 4300 },
    { month: "May", lastMonth: 3300, thisMonth: 4800 },
    { month: "Jun", lastMonth: 3700, thisMonth: 4600 },
    { month: "Jul", lastMonth: 3900, thisMonth: 5000 },
  ],
};

// Function to seed the database
const seedCustomerData = async () => {
  try {
    // Connect to the database
    await connectDB();

    const db = mongoose.connection.db;

    // Check if the customer data already exists
    const existingData = await db.collection('customerdata').findOne();
    if (existingData) {
      console.log("Customer data already exists.");
    } else {
      // Insert customer data into a new collection (customerdata)
      await db.collection('customerdata').insertOne(customerData);
      console.log("Customer data successfully seeded!");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding customer data:", error);
    process.exit(1);
  }
};

// Run the seed function
seedCustomerData();
