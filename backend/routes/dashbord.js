const express = require('express');
const router = express.Router();
const User = require('../models/User1');
const Customer = require('../models/customer');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const Order = require('../models/Order');
const Visitor = require('../models/Visitor');
const jwt = require('jsonwebtoken');

router.get('/stats', async (req, res) => {
  try {
    const [customers, products, suppliers, totalSales, today, productsSold, revenue, visitors, topProducts] = await Promise.all([
      Customer.countDocuments(),
      Product.countDocuments(),
      Supplier.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Order.find({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),
      Order.aggregate([
        { $unwind: "$productList" },
        { $group: { _id: null, totalQuantity: { $sum: "$productList.quantity" } } }
      ]),
      Order.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" },
            total: { $sum: "$totalAmount" }
          }
        }
      ]),
      Visitor.find(),
      Product.find().sort({ totalSold: -1 }).limit(5)
    ]);

    res.json({
      totalCustomers: customers,
      totalProducts: products,
      totalSuppliers: suppliers,
      totalSales: totalSales[0]?.total || 0,
      todaysOrders: today.length,
      productsSold: productsSold[0]?.totalQuantity || 0,
      revenueByDay: revenue,
      visitorInsights: visitors,
      topProducts: topProducts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;