require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Import Routes
const authRoutes = require('./routes/authRoutes');
const signupRoutes = require('./routes/signup');
const dashboardRoutes = require('./routes/dashbord');  // Import the updated dashboard route
const customersRoutes = require('./routes/customers');
const salesRoutes = require('./routes/salesRoute');
const stockRoutes = require('./routes/stockRoute'); 
const voucherRoutes = require('./routes/voucher')
const productRoutes = require("./routes/products.js");
const userDetailsRoute = require('./routes/userDetails'); // Add the new route
const purchaseRoutes = require('./routes/purchase.js')
const supplierRoutes = require("./routes/supplierRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();

// Use Routes
app.use('/api', authRoutes);
app.use('/api', signupRoutes);
app.use('/api', dashboardRoutes);  // Use the dashboard route
app.use('/api', customersRoutes);
app.use('/api', salesRoutes);
app.use('/api', stockRoutes);
app.use('/api', voucherRoutes);
app.use("/api", productRoutes);
app.use('/api', userDetailsRoute);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/inventory", inventoryRoutes);

// Root Route (Just a check to ensure the server is running)
app.get('/', (req, res) => {
  res.send('Server running and DB connected');
});

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
