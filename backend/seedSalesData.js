require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Combined Sales Data
const salesData = {
  sales: [
    {
      id: "01",
      invoiceNo: "0010",
      salesBy: "Arham",
      customerName: "Mishba",
      date: "09/09/24",
      totalAmount: "5000 RS",
    },
    {
      id: "02",
      invoiceNo: "0110",
      salesBy: "Hameel",
      customerName: "Hassaan",
      date: "09/10/24",
      totalAmount: "15000 RS",
    },
    {
      id: "03",
      invoiceNo: "0114",
      salesBy: "Arham",
      customerName: "Jasid",
      date: "07/10/24",
      totalAmount: "5000 RS",
    },
  ],
};

// Function to seed the database
const seedSalesData = async () => {
  try {
    // Connect to the database
    await connectDB();

    const db = mongoose.connection.db;

    // Check if the sales data already exists
    const existingData = await db.collection('salesdata').findOne();
    if (existingData) {
      console.log("Sales data already exists.");
    } else {
      // Insert sales data into a new collection (salesdata)
      await db.collection('salesdata').insertOne(salesData);
      console.log("Sales data successfully seeded!");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding sales data:", error);
    process.exit(1);
  }
};

// Run the seed function
seedSalesData();
