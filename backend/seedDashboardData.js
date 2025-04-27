require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Data to seed into the database
const dashboardData = {
  totalCustomers: 120,
  totalProducts: 75,
  totalSuppliers: 10,
  totalSales: 50000,

  todaysSales: {
    totalSales: 1000,
    totalOrders: 300,
    productsSold: 5,
  },

  visitorInsights: [
    { month: "Jan", loyal: 10, new: 8, unique: 12 },
    { month: "Feb", loyal: 15, new: 10, unique: 14 },
    { month: "Mar", loyal: 12, new: 12, unique: 15 },
    { month: "Apr", loyal: 18, new: 14, unique: 16 },
    { month: "May", loyal: 14, new: 16, unique: 18 },
    { month: "Jun", loyal: 16, new: 15, unique: 14 },
    { month: "Jul", loyal: 15, new: 14, unique: 16 },
  ],

  topProducts: [
    { id: "01", name: "Piano Gel", popularity: 45, sales: "45k" },
    { id: "02", name: "Click Sky", popularity: 29, sales: "29k" },
    { id: "03", name: "A Star", popularity: 18, sales: "18k" },
    { id: "04", name: "Fineliner", popularity: 25, sales: "25k" },
  ],

  revenueByDay: [
    { day: "Monday", online: 15000, offline: 12000 },
    { day: "Tuesday", online: 18000, offline: 14000 },
    { day: "Wednesday", online: 22000, offline: 16000 },
    { day: "Thursday", online: 19000, offline: 15000 },
    { day: "Friday", online: 21000, offline: 17000 },
    { day: "Saturday", online: 25000, offline: 19000 },
    { day: "Sunday", online: 23000, offline: 18000 },
  ],
};

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Access the MongoDB instance
    const db = mongoose.connection.db;

    // Check if the data already exists in the collection
    const existingData = await db.collection('dashboardstats').findOne();

    if (existingData) {
      console.log("Database already seeded with data.");
      return;
    }

    // Insert the new data into the 'dashboardstats' collection
    await db.collection('dashboardstats').insertOne(dashboardData);

    console.log("Database successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
