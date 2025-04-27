require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Product data to seed
const productData = {
  products: [
    {
      id: "1",
      name: "Price",
      status: "Active",
    },
    {
      id: "2",
      name: "Qnty",
      status: "Active",
    },
  ],
};

// Function to seed the database
const seedProductData = async () => {
  try {
    // Connect to the database
    await connectDB();

    const db = mongoose.connection.db;

    // Check if the product data already exists
    const existingProducts = await db.collection('products').findOne();
    if (existingProducts) {
      console.log("Product data already exists.");
    } else {
      // Insert product data into a new collection (products)
      await db.collection('products').insertOne(productData);
      console.log("Product data successfully seeded!");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding product data:", error);
    process.exit(1);
  }
};

// Run the seed function
seedProductData();
