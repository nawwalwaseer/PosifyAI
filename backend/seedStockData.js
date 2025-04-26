require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Stock Data
const stockData = [
  {
    id: "01",
    productName: "Copymate A4",
    model: "2424",
    salePrice: "1100Rs",
    purchasePrice: "900Rs",
    inQty: "900",
    outQty: "900",
    stock: "0",
    stockSalePrice: "0",
    stockPurchase: "0",
  },
  {
    id: "02",
    productName: "Dollar Ink",
    model: "2424",
    salePrice: "100Rs",
    purchasePrice: "70Rs",
    inQty: "700",
    outQty: "600",
    stock: "100",
    stockSalePrice: "10000Rs.",
    stockPurchase: "7000Rs.",
  },
  {
    id: "03",
    productName: "Double A",
    model: "2425",
    salePrice: "1000Rs",
    purchasePrice: "700Rs",
    inQty: "600",
    outQty: "600",
    stock: "0",
    stockSalePrice: "0",
    stockPurchase: "0",
  },
  {
    id: "04",
    productName: "Domicila cover",
    model: "2025",
    salePrice: "400Rs",
    purchasePrice: "300Rs",
    inQty: "350",
    outQty: "200",
    stock: "150",
    stockSalePrice: "60000Rs.",
    stockPurchase: "52000Rs.",
  },
  {
    id: "05",
    productName: "Photo paper",
    model: "2023",
    salePrice: "800Rs",
    purchasePrice: "600Rs",
    inQty: "400",
    outQty: "400",
    stock: "0",
    stockSalePrice: "0",
    stockPurchase: "0",
  }
];

// Function to seed the database
const seedStockData = async () => {
  try {
    // Connect to the database
    await connectDB();

    const db = mongoose.connection.db;

    // Check if the stock data already exists
    const existingData = await db.collection('stockdata').findOne();
    if (existingData) {
      console.log("Stock data already exists.");
    } else {
      // Insert stock data into a new collection (stockdata)
      await db.collection('stockdata').insertOne({ stock: stockData });
      console.log("Stock data successfully seeded!");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding stock data:", error);
    process.exit(1);
  }
};

// Run the seed function
seedStockData();
