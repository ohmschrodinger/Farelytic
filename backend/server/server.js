const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
console.log('Looking for .env file at:', dotenvPath);
require('dotenv').config({ path: dotenvPath });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection configuration
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/farelytic';
console.log('Using MongoDB URI:', mongoURI);

// MongoDB connection with better error handling
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start server only after MongoDB connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});