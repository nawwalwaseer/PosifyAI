require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your DB connection file

// Voucher Data to be seeded
const voucherData = [
  {
    id: "01",
    voucherNo: "CR2145",
    date: "12/1/25",
    remark: "Stock",
    debit: "10,000,000 Rs",
    credit: "0 Rs",
  },
  {
    id: "02",
    voucherNo: "CQ2145",
    date: "12/1/25",
    remark: "Stock",
    debit: "0 Rs",
    credit: "20,000,000 Rs",
  },
  {
    id: "03",
    voucherNo: "CQ220M",
    date: "12/1/25",
    remark: "Stock",
    debit: "12,000,000 Rs",
    credit: "0 Rs",
  }
];

// Function to seed the voucher data
const seedVoucherData = async () => {
  try {
    // Connect to the database
    await connectDB();

    const db = mongoose.connection.db;

    // Check if the voucher data already exists
    const existingData = await db.collection('vouchers').findOne();
    if (existingData) {
      console.log("Voucher data already exists.");
    } else {
      // Insert voucher data into a new collection (vouchers)
      await db.collection('vouchers').insertMany(voucherData);
      console.log("Voucher data successfully seeded!");
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding voucher data:", error);
    process.exit(1);
  }
};

// Run the seed function
seedVoucherData();
