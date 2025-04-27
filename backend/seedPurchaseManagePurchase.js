require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Combined Purchase Data
const purchaseData = [
  {
    id: "01",
    invoiceNo: "0010",
    purchaseId: "01000",
    supplierName: "Awais",
    purchaseDate: "09/09/24",
    totalAmount: "5000 RS",
  },
  {
    id: "02",
    invoiceNo: "1010",
    purchaseId: "01000",
    supplierName: "Hamid",
    purchaseDate: "09/09/24",
    totalAmount: "5000 RS",
  },
];

// Function to seed the database
const seedPurchaseData = async () => {
  try {
    // Connect to the database
    await connectDB();

    const db = mongoose.connection.db;

    // Check if the purchase data already exists
    const existingData = await db.collection('purchasedata').findOne();
    if (existingData) {
      console.log("Purchase data already exists.");
    } else {
      // Insert purchase data into a new collection (purchasedata)
      await db.collection('purchasedata').insertOne({ purchases: purchaseData });
      console.log("Purchase data successfully seeded!");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding purchase data:", error);
    process.exit(1);
  }
};

// Run the seed function
seedPurchaseData();
