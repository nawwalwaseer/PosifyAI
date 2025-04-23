const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const signupRoutes = require('./routes/signup');

// Use Routes
app.use('/api', authRoutes);
app.use('/api', signupRoutes);

// Root Route (Just a check to ensure the server is running)
app.get('/', (req, res) => {
  res.send('Server running and DB connected');
});

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
